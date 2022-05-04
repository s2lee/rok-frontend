import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CommentForm = ({ handleSubmit, initialContents = "" }) => {
  let { user } = useContext(AuthContext);
  const [contents, setContents] = useState(initialContents);
  const isTextareaDisabled = contents.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(contents);
    setContents("");
  };

  return (
    <>
      {user ? (
        <form onSubmit={onSubmit}>
          <textarea
            placeholder="댓글을 작성하세요"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <button type="submit" disabled={isTextareaDisabled}>
            댓글 작성
          </button>
        </form>
      ) : (
        <>
          <Link to="/login">
            <div>댓글에 참여하시려면 로그인주세요</div>
          </Link>
        </>
      )}
    </>
  );
};

export default CommentForm;
