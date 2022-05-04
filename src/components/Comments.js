import React from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comment, replies, addComment, parentId = null }) => {
  const replyId = parentId ? parentId : comment.id;

  return (
    <div key={comment.id} className="comment">
      <h5>작성자: {comment.nickname}</h5>
      <h5>{comment.date_create}</h5>
      <p>내용 : {comment.contents}</p>
      <CommentForm handleSubmit={(contents) => addComment(contents, replyId)} />
      {replies && (
        <div className="reply-Container">
          {replies.map((reply) => (
            <Comments
              comment={reply}
              key={reply.id}
              addComment={addComment}
              parentId={comment.id}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
