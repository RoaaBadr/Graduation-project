import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import logo from "../assets/logo-Nafsi.png";

const Footer = () => {
  return (
    <>
    <div className="footer-wrapper">
      
      <div className="footer-section-one">

        <div className="footer-logo-container">
        <img src={logo} alt="" />
        <p className="logo-text">Nafsy</p>
        </div>

        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>

      </div>

      <div className="footer-section-two">
        <div className="footer-section-columns">
          <h5>Usful Links</h5>
          <span 
          onClick={() => window.open("https://unitedgmh.org/")}>
            United Global Mental Health</span>
          <span 
          onClick={() => window.open("https://blog.opencounseling.com/suicide-hotlines/")}>
            International Suicide Hotlines</span>
          <span 
          onClick={() => window.open("https://findahelpline.com/")}>
            Find A Helpline</span>
          <span 
          onClick={() => window.open("https://checkpointorg.com/global/")}>
            Global Mental Health Resources</span>
          <span 
          onClick={() => window.open("https://www.helpguide.org/find-help.htm")}>
            HelpGuide Mental Health Helplines</span>
        </div>

        <div className="footer-section-columns">
        <h5>Support Communities</h5>
          <span 
          onClick={() => window.open("https://psychcentral.com/")}>
            PsychCentral</span>
          <span 
          onClick={() => window.open("https://www.reddit.com/r/mentalhealth/")}>
            Reddit Mental Health Subreddits</span>
          <span 
          onClick={() => window.open("https://www.7cups.com/")}>
            7 Cups</span>
          <span 
          onClick={() => window.open("https://adaa.org/find-help/support")}>
           Anxiety and Depression Association of America (ADAA)</span>
           <span 
          onClick={() => window.open("https://www.dailystrength.org/")}>
            HelpGuide Mental Health Helplines</span>
            <span 
          onClick={() => window.open("https://www.helpguide.org/find-help.htm")}>
            DailyStrength</span>
            <span 
          onClick={() => window.open("https://headsupguys.org/")}>
            HeadsUpGuys</span>
            <span 
          onClick={() => window.open("https://www.dbsalliance.org/")}>
            Depression and Bipolar Support Alliance (DBSA)</span>
            <span 
          onClick={() => window.open("https://themighty.com/")}>
            The Mighty</span>
        </div>

        {/* <div className="footer-section-columns">
          <span>About</span>
          <span>Services</span>
          <span>Articles</span>
          <span>Videos</span>
        </div> */}

      </div>
    </div>
    </>
  );
};

export default Footer;
