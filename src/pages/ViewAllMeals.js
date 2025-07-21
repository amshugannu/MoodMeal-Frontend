import React, { useEffect, useState } from "react";
import axios from "axios";
import "./viewallmeals.css";

const ViewMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8080/api/meals", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log("Meals fetched:", res.data);  // Debug
      setMeals(res.data);
    })
    .catch((err) => {
      console.error("Error fetching meals:", err); // Show error
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Meals</h2>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul className="list-group">
          {meals.map((meal) => (
            <li key={meal.id} className="list-group-item">
              <strong>{meal.name}</strong> - {meal.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMeals;
