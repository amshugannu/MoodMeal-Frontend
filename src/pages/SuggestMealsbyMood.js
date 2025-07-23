// src/components/SuggestMealsByMood.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SuggestMealsbyMood.css';

const SuggestMealsByMood = () => {
  const [moodType, setMoodType] = useState('How you are feeling today ??');
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSuggest = async () => {
    const userId = 1;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:8080/api/suggestions`, {
        params: {
          userId,
          moodType
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuggestedMeals(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch suggestions.');
    }
  };

  const handleAddMealClick = () => {
    navigate('/add-meal');
  };

  return (
    <div className="suggest-mood-container">
      <h2>Suggest Meals by Mood</h2>

      <div className="mood-controls">
        <label>Select Mood: </label>
        <select value={moodType} onChange={(e) => setMoodType(e.target.value)}>
          <option value="HAPPY">Happy</option>
          <option value="SAD">Sad</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="ANGRY">Angry</option>
          <option value="EXCITED">Excited</option>
        </select>

        <button onClick={handleSuggest} className="suggest-btn">
          Get Suggestions
        </button>

        <button onClick={handleAddMealClick} className="add-meal-btn">
          Add Meals
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {suggestedMeals.length > 0 && (
        <div>
          <h3>Suggested Meals:</h3>
          <div className="meal-grid">
            {suggestedMeals.map((meal) => (
              <div className="meal-card" key={meal.id}>
                <h4>{meal.name}</h4>
                <p>{meal.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestMealsByMood;
