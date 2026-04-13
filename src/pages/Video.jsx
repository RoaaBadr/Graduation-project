import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import dbData from '../data.js';
import Navbar from "../sections/Navbar.jsx";

export default function Videos() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = dbData.videos.find(v => v.id === id);
    setRecipe(video || null);
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!recipe) return <p>Video not found.</p>;

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        {recipe && (
          <div className="recipe">
            <h2 className="recipe-title">{recipe.title}</h2>
            <h3 className="recipe-type">{recipe.type}</h3> 

      <iframe
            src={recipe.video}
            title={recipe.title}
            allowFullScreen
          ></iframe> 
            <div className="ingredients">
              <h3 className="recipe-ingredients recipe-subtitle">
                {recipe.header}
              </h3>
              <div>
              </div>
            </div>

            <div className="instructions">
              <h3 className="recipe-instructions recipe-subtitle">
                {recipe.header}
              </h3>


            </div>
          </div>
        )}

        <Link className="link" to="/video">
        <button className="btn btn-secondary read-more-btn">
            Return to main page
          </button>
        </Link>
      </div>
    </>
  );
}
