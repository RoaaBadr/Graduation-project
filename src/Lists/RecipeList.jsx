import './RecipeList.css' 
import { Link } from 'react-router-dom'

function RecipeList({ recipes }) {
  console.log(recipes);
  if (!recipes) {
    return <p>No articles available.</p>;
  }

  return (
    
    <div className='recipe-list'> 
      {recipes.map(recipe => (
        <div key={recipe._id} className='card'>
          <img src={recipe.cover} alt={recipe.title} className="card-img" />
            <h3 className='recipelist-title'>{recipe.title}</h3>
            <h4 className='recipelist-subtitle'> {recipe.tags}</h4>
            <p className='recipe-cooking-time'>{recipe.description}</p>
            <Link className='link' to={`/recipes/${recipe._id}`}  ><button className='btn btn-secondary read-more-btn'>Read more</button></Link>
        </div> 
      ))}
    </div>
  )
}

export default RecipeList;