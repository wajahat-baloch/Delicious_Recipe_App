import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
      );

      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: window.innerWidth < 768 ? 1.3 : 3, // Adjust perPage based on window width
            arrows: window.innerWidth < 768 ? false : true, // Adjust arrows based on window width
            pagination: window.innerWidth < 768 ? false : true, // Adjust pagination based on window width
            drag: "free",
            gap: window.innerWidth < 768 ? "1.7rem" : "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  margin: 4rem 0rem;

  @media (max-width: 768px) {
    margin: -8rem -2rem 0rem -2rem;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  width: 100%;

  p {
    position: absolute;
    left: 50%;
    bottom: 35%;
    z-index: 10;
    color: white;
    transform: translate(-50%, 0%);
    width: 100%;
    text-align: center;
    font-weight: 600;
    padding-bottom: 20px;
    font-size: 0.8rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    position: absolute;
    border-radius: 2rem;
    width: 100%;
    left: 0;
    height: 50%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  border-radius: 2rem;
  height: 50%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
