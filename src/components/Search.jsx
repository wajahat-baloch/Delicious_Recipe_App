import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
    setInput("");
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch />
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin: 0rem 0rem 2rem 0rem;

  position: relative;
  width: 100%;

  input {
    border: none;
    width: 100%;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    color: white;
  }
  @media (max-width: 768px) {
    input {
      width: 120%;
      margin-left: -30px;
    }

    svg {
      margin: 0 10px 0 -28px;
    }
  }
  svg {
    position: absolute;
    color: white;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
  }
`;

export default Search;
