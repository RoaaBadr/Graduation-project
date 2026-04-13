/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './RecipeList.css'; 
import { Link } from 'react-router-dom';

function VideosList({ videos }) {
  useEffect(() => {
    if (videos) {
      localStorage.setItem('videoList', JSON.stringify(videos));
    }
  }, [videos]);

  if (!videos || videos.length === 0) {
    return <p>No videos available.</p>;
  }

  return (
    <div className='recipe-list'>
      {videos.map(recipe => (
        <div key={recipe.id} className='card'>
          <img src={recipe.img} alt={recipe.title} className="card-img" />
          <h3 className='recipelist-title'>{recipe.title}</h3>
          <h4 className='recipelist-subtitle'>{recipe.type}</h4>
          <p className='recipe-cooking-time'>{recipe.description}</p>
            <Link className='link' to={`/videos/${recipe.id}`}  ><button className='btn btn-secondary read-more-btn'>Read more</button></Link>
        </div>
      ))}
    </div>
  );
}

export default VideosList;
