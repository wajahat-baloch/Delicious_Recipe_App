import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [search, setSearch] = useState([]);
  let params = useParams();

  const getSearch = async (name) => {
    try {
      const result = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=12`
      );

      if (!result.ok) {
        throw new Error("Failed to fetch data");
      }

      const recipes = await result.json();
      setSearch(recipes.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    getSearch(params.search);
  }, [params.search]);

  return (
    <Grid>
      {search.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
