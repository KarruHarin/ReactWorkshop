import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import FoodCard from "./FoodCard";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meals = [];
        for (let index = 0; index < 5; index++) {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const result = await response.json();
          meals.push(result.meals[0]);
        }
        setData(meals);
        setIsLoading(false);
      } catch (error) {
        console.log("There was an error", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [load]);

  return (
    <div className="home-container">
      <header className="head">
        <div>
          <span>Welcome to </span>
          <div className="logoHead">
            <span className="my">my</span>
            <span className="Kitchen">Kitchen</span>
          </div>
        </div>
        <div>
          <button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setLoad(!load);
            }}
          >
            Get Random Recipes
          </button>
        </div>
      </header>

      <section className="recipe-section">
        <div className="recipe-header">
          <p>My kitchen's a little lonely. Maybe you could spice things up?</p>
        </div>
        <div className="recipe-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            data.map((meal, index) => (
              <FoodCard
                key={index}
                image={meal.strMealThumb}
                name={meal.strMeal}
                category={meal.strCategory}
                id={meal.idMeal}
              />
            ))
          )}
        </div>
        <div className="divider"></div>
      </section>
    </div>
  );
}

export default Home;
