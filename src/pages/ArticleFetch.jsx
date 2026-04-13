import RecipeList from '../Lists/RecipeList.jsx';
import useFetch from '../hooks/useFetch.jsx';
import Navbar from '../sections/Navbar.jsx';

function Home() {
  const { data, isLoading, error } = useFetch('articles');

  const recipes = data?.data ? data.data : [];

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
