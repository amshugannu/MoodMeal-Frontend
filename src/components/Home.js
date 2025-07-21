import React from "react";
import AddMealForm from "../pages/AddMeal";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to MoodMeal!</h2>

      <AddMealForm />
      <Link to="/all-meals">
        <button>View All Meals</button>
      </Link>
      <Link to="/suggestion-meals">
      <button>Suggest Meals By Mood</button>
      </Link>
    </div>
  );
};

export default Home;
