import React, { useContext } from 'react';
import Cart from '../Context/Cart';
import FoodCard from './FoodCard';
import '../styles/Wishlist.css';

function Wishlist() {
  const { cart } = useContext(Cart);

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Your Wish List</h1>
      {cart.length > 0 ? (
        <div className="recipe-grid">
          {cart.map((meal) => (
            <FoodCard
              key={meal.idMeal}
              id={meal.idMeal}
              image={meal.strMealThumb}
              name={meal.strMeal}
              category={`${meal.strCategory} • ${meal.strArea}`}
            />
          ))}
        </div>
      ) : (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;