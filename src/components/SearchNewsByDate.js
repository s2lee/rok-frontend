import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchNewsByDate = () => {
  const { year, month, day } = useParams();
  const [politicalArticles, setPoliticalArticles] = useState([]);
  // const [economicArticles, setEconomicArticles] = useState([]);
  // const [socialArticles, setSocialArticles] = useState([]);
  // const [worldArticles, setWorldArticles] = useState([]);
  // const [cultureArticles, setCultureArticles] = useState([]);
  // const [philosophyArticles, setPhilosophyArticles] = useState([]);
  // const [ideologyArticles, setIdeologyArticles] = useState([]);
  const [isArticle, setIsArticle] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getNewsDateArticle = async () => {
      await axios
        .get(`/news/newspaper/${year}/${month}/${day}`)
        .then((response) => {
          if (!response.data.detail) {
            setPoliticalArticles(response.data.politics);
            // setEconomicArticles(response.data.economy);
            // setSocialArticles(response.data.society);
            // setWorldArticles(response.data.world);
            // setCultureArticles(response.data.culture);
            // setPhilosophyArticles(response.data.philosophy);
            // setIdeologyArticles(response.data.ideology);
            setIsArticle(true);
          } else {
            alert(response.data.detail);
            history.push(`/newspaper`);
          }
        })
        .catch((error) => console.log(error));
    };
    getNewsDateArticle();
  }, [year, month, day, history]);

  return (
    <div>
      {isArticle && (
        <>
          <div>
            <h2>정치</h2>
            {politicalArticles.map((politicalArticle) => {
              return (
                <div key={politicalArticle.id}>
                  <div>
                    <Link
                      to={`/${politicalArticle.category_name}/${politicalArticle.id}/`}
                    >
                      <span>{politicalArticle.title}</span>
                    </Link>
                    <p>내용 : {politicalArticle.contents}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchNewsByDate;
