import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ArticleSection = ({
  articleSectionData,
  topArticleSectionData,
  category,
}) => {
  let { user } = useContext(AuthContext);

  return (
    <>
      <div className="article-section-container">
        <h3>주요 기사</h3>
        {topArticleSectionData.map((top_article) => {
          return (
            <div className="article" key={top_article.id}>
              <div>
                <Link to={`/${category}/${top_article.id}/`}>
                  제목 : {top_article.title}
                </Link>
              </div>
              <div>
                <span>작성자 : {top_article.nickname}</span>
              </div>
            </div>
          );
        })}
        {user && <Link to={`/${category}/post`}>작성</Link>}
      </div>
      <div className="article-section-container">
        <h3>최신기사</h3>
        {articleSectionData.map((article) => {
          return (
            <div className="article" key={article.id}>
              <div>
                <Link to={`/${category}/${article.id}/`}>
                  제목 : {article.title}
                </Link>
              </div>
              <div>
                <span>작성자 : {article.nickname}</span>
              </div>
            </div>
          );
        })}
        {user && <Link to={`/${category}/post`}>작성</Link>}
      </div>
    </>
  );
};

export default ArticleSection;
