// src/components/SuggestMealsByMood.js
import React, { useState } from 'react';
import axios from 'axios';

const SuggestMealsByMood = () => {
  const [moodType, setMoodType] = useState('SAD');
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [error, setError] = useState('');

  const handleSuggest = async () => {
    const userId = 1; // Default user ID
    const token = localStorage.getItem('token'); // JWT token saved on login

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Suggest Meals by Mood</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Select Mood: </label>
        <select value={moodType} onChange={(e) => setMoodType(e.target.value)}>
          <option value="HAPPY">Happy</option>
          <option value="SAD">Sad</option>
          <option value="STRESSED">Stressed</option>
          <option value="ANGRY">Angry</option>
          <option value="EXCITED">Excited</option>
        </select>

        <button onClick={handleSuggest} style={{ marginLeft: '10px' }}>
          Get Suggestions
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {suggestedMeals.length > 0 && (
        <div>
          <h3>Suggested Meals:</h3>
          <ul>
            {suggestedMeals.map((meal) => (
              <li key={meal.id}>
                <strong>{meal.name}</strong> - {meal.cuisine}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuggestMealsByMood;
