import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeArticle from "../components/HomeArticle";

const HomePage = () => {
  const [homeArticles, setHomeArticles] = useState([]);

  useEffect(() => {
    const getHomeArticles = async () => {
      const response = await axios.get("/news/home/");
      setHomeArticles(response.data.article);
    };
    getHomeArticles();
  }, []);

  return (
    <div className="home-container">
      <h1>Home</h1>
      <HomeArticle homeArticles={homeArticles} />
    </div>
  );
};

export default HomePage;
