import React from "react";
import { Link } from "react-router-dom";

const HomeArticle = ({ homeArticles }) => {
  return (
    <div className="article">
      {homeArticles.map((article) => {
        return (
          <div key={article.id}>
            <div>
              <Link to={`/${article.category_name}/${article.id}/`}>
                <span>{article.title}</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeArticle;
