import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './addmeal.css';

const AddMeal = () => {
  const [meal, setMeal] = useState({
    name: "",
    cuisine: "",
    dietaryTags: "",
    moodType: "",
    description: "",
    allergens: "",
  });

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("Please login first.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/meals/dto", meal, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setStatus("Meal added successfully!");
      setMeal({
        name: "",
        cuisine: "",
        dietaryTags: "",
        moodType: "",
        description: "",
        allergens: "",
      });
    } catch (error) {
      setStatus("Failed to add meal.");
      console.error("Error adding meal:", error);
    }
  };

  return (
    <div className="add-meal-container">
      <h2>Add New Meal</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Meal Name:</label><br />
          <input type="text" name="name" value={meal.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Cuisine:</label><br />
          <input type="text" name="cuisine" value={meal.cuisine} onChange={handleChange} required />
        </div>
        <div>
          <label>Dietary Tags:</label><br />
          <input type="text" name="dietaryTags" value={meal.dietaryTags} onChange={handleChange} required />
        </div>
        <div>
          <label>Mood Type:</label><br />
          <select name="moodType" value={meal.moodType} onChange={handleChange} required>
            <option value="">Select Mood</option>
            <option value="HAPPY">HAPPY</option>
            <option value="SAD">SAD</option>
            <option value="ANGRY">ANGRY</option>
            <option value="NEUTRAL">NEUTRAL</option>
          </select>
        </div>
        <div>
          <label>Description:</label><br />
          <textarea name="description" value={meal.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Allergens:</label><br />
          <input type="text" name="allergens" value={meal.allergens} onChange={handleChange} required />
        </div>

        <br />

        {/* Status message placed here */}
        {status && <p style={{ color: status.includes("successfully") ? "green" : "red" }}>{status}</p>}

        <div className= "button-group">
              <button type="submit">Add Meal</button>

              <button onClick={() => navigate("/suggestion-meals")}>
                        Get Meals by Mood
              </button>
        </div>
      </form>

    </div>
  );
};

export default AddMeal;
