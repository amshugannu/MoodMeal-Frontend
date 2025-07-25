// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import Home from "./components/Home";
import ViewAllMeals from './pages/ViewAllMeals';
import AddMeal from "./pages/AddMeal";
import Navbar from './components/Navbar';
import SuggestMealsbyMood from "./pages/SuggestMealsbyMood";
import RegisterForm from "./components/RegisterForm";  // ✅ Make sure the file path is correct

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-Meal" element={<AddMeal />} />
        <Route path="/all-meals" element={<ViewAllMeals />} />
        <Route path="/suggestion-meals" element={<SuggestMealsbyMood/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // ✅ THIS LINE IS CRUCIAL
