import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import Navbar from '../sections/Navbar.jsx';

export default function Recipe() {
  const { id } = useParams();
  const url = `https://g-p-1k1q.onrender.com/GP/articles/get-one/${id}`;
  const { error, isLoading, data } = useFetch(url);

  const recipe = data ? data.Data : null;

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        {error && <p className="error">{error}</p>}
        {isLoading && <p className="loading">Loading Articles...</p>}
        {recipe ? (
          <div className="recipe">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p className="recipe-content">{recipe.content}</p>
            <p className="recipe-tags">Tags: {recipe.tags.join(', ')}</p>
            <p className="recipe-publish-date">Published on: {new Date(recipe.publish_date).toLocaleDateString()}</p>
            <p className="recipe-author">Published by: {recipe.publish_by}</p>
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
