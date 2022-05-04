import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const PostArticle = () => {
  const { category } = useParams();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState(null);
  let history = useHistory();

  const postArticle = async (event) => {
    event.preventDefault();
    let articleFormData = new FormData();
    articleFormData.append("title", title);
    articleFormData.append("contents", contents);
    if (image !== null) {
      articleFormData.append("image", image);
    }
    await axios
      .post(`/news/${category}/`, articleFormData)
      .then((response) => {
        history.push(`/${category}/`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h3>{category} 기사를 작성하세요</h3>
      <div>
        <form onSubmit={postArticle}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>내용</label>
          <input
            type="text"
            value={contents}
            placeholder="내용"
            onChange={(e) => setContents(e.target.value)}
          />
          <label>사진</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit">등록</button>
        </form>
      </div>
    </>
  );
};

export default PostArticle;
