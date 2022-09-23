import React from "react";
import "./reviewCard.css";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "lightgray",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <>
      <div className="reviewCard">
        <div className="sec-1">
          <img src={profilePng} alt="User" />
          <p>{review.name}</p>
        </div>
        <div className="sec-2">
          <ReactStars {...options} />
          <span>{review.comment}</span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
