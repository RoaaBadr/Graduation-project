import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dbData from '../data.js';
import Navbar from '../sections/Navbar.jsx';

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const article = dbData.articles.find(a => a.id === id);
    setRecipe(article || null);
    setIsLoading(false);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        {isLoading && <p className="loading">Loading Articles...</p>}
        {recipe ? (
          <div className="recipe">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-content">{recipe.content}</p>
            <p className="recipe-tags">Type: {recipe.type}</p>
            <p className="recipe-author">Author: {recipe.author}</p>
          </div>
        ) : (
          !isLoading && <p>No recipe found</p>
        )}
        <Link className="link" to="/blogs">
          <button className="btn btn-secondary read-more-btn">Return to main page</button>
        </Link>
      </div>
    </>
  );
}
