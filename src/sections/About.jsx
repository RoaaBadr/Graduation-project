import React from "react";
import AboutBackgroundImage from "../assets/Appinstallation.png";
import google from "../assets/google.svg";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container"></div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="seco-text">About Us</p>
        <h1 className="primary-heading">We are more than a chatbot</h1>
        <p className="primary-text">
          Welcome to our mental health resource center! We’re dedicated to
          providing authoritative information, support, and hope to individuals
          and families affected by mental health challenges.
        </p>
        <p className="primary-text">
          Discover a wealth of knowledge at your fingertips! Our mental health
          app provides free resources to deepen your understanding of mental
          health issues. Dive into research studies, access informative
          materials, and find support.
        </p>
        <div className="about-buttons-container">
          <img
            src={google}
            alt="google_play"
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
