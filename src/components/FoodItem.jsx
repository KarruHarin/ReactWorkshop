import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/icons8-heart-100.png';
import like from "../assets/icons8-favorite-100.png";
import CartContext from "../Context/Cart.js"; 
import '../styles/FoodItem.css';

function FoodItem() {
  const [foodDetails, setFoodDetails] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();
  const { cart, setcart } = useContext(CartContext); 

  // Check if this item is already in favorites when component loads
  useEffect(() => {
    if (cart && cart.some(item => item.idMeal === id)) {
      setToggle(true);
    }
  }, [cart, id]);

  const handleLike = () => {
    setToggle(!toggle);
    if (!toggle) {
      // Only add to cart if not already liked
      setcart(prevCart => [...prevCart, foodDetails]);
    } else {
      // Remove from cart if unliked
      setcart(prevCart => prevCart.filter(item => item.idMeal !== foodDetails.idMeal));
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        if (result.meals && result.meals.length > 0) {
          setFoodDetails(result.meals[0]);
        } else {
          console.error('No meal found');
        }
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!foodDetails) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = foodDetails[`strIngredient${i}`];
    const measure = foodDetails[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${ingredient} - ${measure ? measure.trim() : ''}`);
    }
  }

  const recipeSteps = foodDetails.strInstructions.split('.').filter(step => step.trim() !== '');

  return (
    <div className="food-container">
      <div className="food-card">
        <div className="food-image">
          <img src={foodDetails.strMealThumb} alt={foodDetails.strMeal} />
          <div className="overlay"></div>
          <div className="food-title">
            <h1>{foodDetails.strMeal}</h1>
          </div>
        </div>

        <div className="food-details">
          <div className="headItem">
            <h2>Recipe Details</h2>
            <img 
              src={toggle ? like : logo} 
              onClick={handleLike} 
              className="like-icon" 
              alt={toggle ? "Remove from favorites" : "Add to favorites"} 
            />
          </div>
          <p><strong>Name:</strong> {foodDetails.strMeal}</p>
          <p><strong>Category:</strong> {foodDetails.strCategory}</p>
          <p><strong>Cuisine:</strong> {foodDetails.strArea}</p>
          <a href={foodDetails.strYoutube} target="_blank" rel="noopener noreferrer" className="video-link">
            Watch Recipe Video
          </a>
        </div>

        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Recipe</h2>
          <ol>
            {recipeSteps.map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;