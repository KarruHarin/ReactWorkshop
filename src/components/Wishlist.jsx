import React, { useContext } from 'react';
import Cart from '../Context/Cart';
import { useNavigate } from 'react-router-dom';
import '../styles/Wishlist.css';

function Wishlist() {
  const navigate = useNavigate();
  const { cart } = useContext(Cart);

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Your Wish List</h1>
      {cart.length > 0 ? (
        <div className="wishlist-grid">
          {cart.map((meal) => (
            <div
              key={meal.idMeal}
              className="wishlist-card"
              onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="wishlist-image" />
              <div className="wishlist-content">
                <h2>{meal.strMeal}</h2>
                <p>{meal.strCategory}</p>
                <p>{meal.strArea}</p>
                <p className="wishlist-link">View Recipe</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;
