import React from "react";
import AddMealForm from "../pages/AddMeal";
import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to MoodMeal!</h2>
      <p>Personalized meal suggestions based on your mood.</p>
    </div>
  );
};

export default Home;
