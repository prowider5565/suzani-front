import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`text-2xl ${
              starRating <= (hover || rating)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => onRatingChange(starRating)}
            onMouseEnter={() => setHover(starRating)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
