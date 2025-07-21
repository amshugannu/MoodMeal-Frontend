import React, { useState } from 'react';
import API from '../api/axiosConfig';

const MoodForm = () => {
  const [moodType, setMoodType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // JWT from login

    const moodData = {
      userId: parseInt(userId),
      moodType,
      description,
    };

    try {
      console.log("Sending mood data:", moodData);
      await API.post('/moods/record', moodData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Mood saved successfully!');
    } catch (err) {
      console.error("Error saving mood:", err);
      setMessage('Error saving mood');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Track Your Mood</h3>
      <div className="mb-3">
        <label>Select Mood</label>
        <select
          className="form-control"
          value={moodType}
          onChange={(e) => setMoodType(e.target.value)}
          required
        >
          <option value="">-- Select Mood --</option>
          <option value="HAPPY">Happy</option>
          <option value="SAD">Sad</option>
          <option value="ANGRY">Angry</option>
          <option value="EXCITED">Excited</option>
          <option value="STRESSED">Stressed</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why do you feel this way?"
        />
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </form>
  );
};

export default MoodForm;
