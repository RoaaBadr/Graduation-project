import "../design/App.css";
import Contact from "../sections/Contact.jsx";
import Header from "../sections/Header.jsx";
import Work from "../sections/Work.jsx";
import Footer from "../sections/Footer.jsx";
import About from "../sections/About.jsx";
import Testimonial from "../sections/Testimonial.jsx";
import Navbar from "../sections/Navbar.jsx";
import { useEffect } from "react";

const Layout = () => {
  useEffect(()=>{
    webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }
      var xprediction = data.x; //these x coordinates are relative to the viewport
      var yprediction = data.y; //these y coordinates are relative to the viewport
      console.log(elapsedTime); //elapsed time is based on time since begin was called
    }).begin();
  

  },[]);
  return (

    <div className="App">
        <Navbar/>
        <Header/>
        <Work/>
        <About/>
        <Testimonial/>
        <Contact/>
        <Footer/>
    </div>

  )
};

export default Layout;