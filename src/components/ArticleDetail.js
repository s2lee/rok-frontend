import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleVoteButton from "./ArticleVoteButton";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const ArticleDetail = ({ articleDetail }) => {
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  // console.log(comments)
  // let temp = comments.filter((comment) => {if (comment.reply){
  //   return comment.reply.parent
  // }})
  // console.log(temp)
  const addComment = async (contents, parent = null) => {
    const commentFormData = {
      article: id,
      contents: contents,
      parent,
    };
    await axios
      .post(`/news/${id}/comments/`, commentFormData)
      .then((sentComment) => {
        if (sentComment.data["parent"]) {
          // 답글만 덧붙일수 있게
          getComments();
          // console.log(sentComment.data)
          // setComments(comments.filter(comment => comment.reply.parent === comment.id))
          // setComments(current => [...current, { ...data }]);
        } else {
          setComments([...comments, sentComment.data]);
        }
      })
      .catch((error) => console.log(error));
  };
  const getComments = async () => {
    await axios
      .get(`/news/${id}/comments/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getComments();
    
  }, []);

  return (
    <div id="wrap">
      <h2>제목 : {articleDetail.title}</h2>
      <span>입력 {articleDetail.date_posted}</span>
      <p>내용 : {articleDetail.contents}</p>
      <span>작성자 : {articleDetail.nickname}</span>
      {articleDetail.image && (
        <img src={articleDetail.image} alt="articleImage" />
      )}
      <ArticleVoteButton
        articleAuthor={articleDetail.author}
        articleDatePosted={articleDetail.date_posted}
        spearNum={articleDetail.spear_count}
        shieldNum={articleDetail.shield_count}
      />
      <CommentForm handleSubmit={addComment} />
      <div className="comment-container">
        {comments.map((comment) => (
          <Comments
            key={comment.id}
            comment={comment}
            // replies={getReplies(comment.id)}
            replies={comment.reply}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
