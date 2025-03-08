/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './RecipeList.css'; 
import { Link, useNavigate } from 'react-router-dom';

function VideosList({ recipes }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (recipes) {
      localStorage.setItem('videoList', JSON.stringify(recipes));
    }
  }, [recipes]);

  if (!recipes || recipes.length === 0) {
    return <p>No videos available.</p>;
  }

  const handleReadMore = (recipe) => {
    navigate(`/videos/${recipe.id}`);
  };
  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div key={recipe.videoId} className='card'>
          <img src={recipe.thumbnail} alt={recipe.title} className="card-img" />
          <h3 className='recipelist-title'>{recipe.title}</h3>
          <h4 className='recipelist-subtitle'>{recipe.type}</h4>
          <p className='recipe-cooking-time'>{recipe.description}</p>
            <Link className='link' to={`/videos/${recipe.videoId}`}  ><button className='btn btn-secondary read-more-btn'>Read more</button></Link>
        </div>
      ))}
    </div>
  );
}

export default VideosList;
