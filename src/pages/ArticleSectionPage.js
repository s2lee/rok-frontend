import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleSection from "../components/ArticleSection";

const ArticleSectionPage = () => {
  const [articleSectionData, setArticleSectionData] = useState([]);
  const [topArticleSectionData, setTopArticleSectionData] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    const getArticleSection = async () => {
      const response = await axios.get(`/news/${category}/`);
      setArticleSectionData(response.data.articles);
      setTopArticleSectionData(response.data.top_articles);
    };
    getArticleSection();
  }, [category]);

  return (
    <div>
      <h1>{category} Article</h1>
      <ArticleSection
        articleSectionData={articleSectionData}
        topArticleSectionData={topArticleSectionData}
        category={category}
      />
    </div>
  );
};

export default ArticleSectionPage;
