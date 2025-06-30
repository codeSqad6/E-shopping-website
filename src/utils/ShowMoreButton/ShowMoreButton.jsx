import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShowMoreButton.css";

const ShowMoreButton = ({ to = "/shop" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="show-more-btn" onClick={handleClick}>
      Show More
      <span className="arrow">➜</span>
    </button>
  );
};

export default ShowMoreButton;
