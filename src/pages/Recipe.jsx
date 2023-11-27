import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import React from "react";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  let params = useParams();
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const result = await data.json();
    setDetails(result);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <Main>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </Main>

      <Info>
        <ButtonParent>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonParent>

        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      margin-top: 2rem;
    }
  }

  img {
    width: 120%;
  }

  ul {
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    margin-left: -2.3rem;
  }
`;

const Main = styled.div`
  width: 100%;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  height: 50px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ButtonParent = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const Info = styled.div`
  margin-left: 10rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 125%;
  }
`;

export default Recipe;
