import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FoodCard.css';

function FoodCard({ image, name, category, id }) {
  return (
    <Link to={`/recipe/${id}`} className="food-card-link">
      <div className="food-card">
        <div className="food-card-image">
          <img src={image} alt={name} />
        </div>
        <div className="food-card-content">
          <h2 className="food-card-title">{name}</h2>
          <p className="food-card-category">{category}</p>
        </div>
      </div>
    </Link>
  );
}

export default FoodCard;