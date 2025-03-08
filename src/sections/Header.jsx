import React from "react";
import BannerImage from "../assets/Chatbot-bro1.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Mental Health Journey Begins Now
          </h1>
          <p className="primary-text">
            start your Journey to emotional wellness today. 
            chat, connect and experience the positive impact of 
            conversations.
          </p>
          <a
            href="https://www.chatbase.co/chatbot-iframe/YKluYBGoAjxY5A1u725kd"
            target="_blank"
          >
            <button className="secondary-button">
              Let's Chat <FiArrowRight />
            </button>
          </a>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;