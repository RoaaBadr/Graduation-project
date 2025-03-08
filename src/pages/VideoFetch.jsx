import RecipeList from '../Lists/VideosList.jsx'
import useFetch from '../hooks/useFetch.jsx';
import '../design/App.css'
import Navbar from '../sections/Navbar.jsx';
 
function Videos() {

  const { data, isLoading, error } = useFetch('https://g-p-1k1q.onrender.com/GP/videos/get-videos')
  
    return (
    <><Navbar/>
      <div className='home-container-1'>
        
        <div className='banner'>
        <h1 className="home-title-1">Videos List</h1>  </div>
         {error && <p className='error'>{error}</p>}
         {isLoading && <p className='loading'>Loading Videos...</p>}
        <RecipeList recipes={data}/>
      </div></>
    )
  }
  
  export default Videos 