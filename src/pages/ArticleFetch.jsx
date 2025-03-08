import RecipeList from '../Lists/RecipeList.jsx';
import useFetch from '../hooks/useFetch.jsx';
import Navbar from '../sections/Navbar.jsx';

function Home() {
  const { data, isLoading, error } = useFetch('https://g-p-1k1q.onrender.com/GP/articles/getall');

  // Ensure `data` and `data.data` are defined before using them
  const recipes = data ? data.data : [];

  return (
    <>
      <Navbar />
      <div className='home-container-1'>
        <div className='banner'>
          <h1 className="home-title-1">Articles List</h1>
        </div>
        {error && <p className='error'>{error}</p>}
        {isLoading && <p className='loading'>Loading Articles...</p>}
        {!isLoading && !error && <RecipeList recipes={recipes} />}
      </div>
    </>
  );
}

export default Home;
