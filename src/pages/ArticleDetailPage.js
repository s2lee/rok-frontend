import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleDetail from "../components/ArticleDetail";

const ArticleDetailPage = () => {
  let { category, id } = useParams();
  const [articleDetail, setArticleDetail] = useState([]);

  useEffect(() => {
    const getArticleDetail = async () => {
      const response = await axios.get(`/news/${category}/${id}/`);
      setArticleDetail(response.data);
    };
    getArticleDetail();
  }, [id, category]);

  return (
    <div>
      <ArticleDetail articleDetail={articleDetail} />
    </div>
  );
};

export default ArticleDetailPage;
