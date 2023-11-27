import React, { useEffect, useState } from "react"; //UseEffect & useState are hooks -> useState manages components, useEffct manages side effects
import './App.css'; //imports style from App.css
import Recipe from './Recipe';

const App = () => {

  const APP_ID = "a9ef71a1"; //Stores app ID from EDAMAM
  const APP_KEY = "5cbf5dd61bad1dd7bbcaf81e8ae6d4ac"; //Stores app key from EDAMAM

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]); 

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json(); //await waits until async has been fulfilled
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch = ('');
  }

  return (
    <div className="App">
      <form onSubmit = {getSearch} className = "search-form">
        <input className="search-bar" type = "text" value = {search} onChange = {updateSearch} />
        <button className = "search-button" type = "submit">Search</button>
      </form>
      <div className = "recipes">
      {recipes.map(recipe =>(
        <Recipe 
          key = {recipe.recipe.label}
          title = {recipe.recipe.label} 
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          />
      ))};
      </div>
    </div>
  );
}

export default App;
