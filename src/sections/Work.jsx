import React from "react";
import icon1 from "../assets/flexible-access.svg";
import icon2 from "../assets/system-settings.svg";
import icon3 from "../assets/availability.svg";
import icon4 from "../assets/safe-and-stable.svg";

const Work = () => {
  const workInfoData = [
    {
      image: icon1,
      title: "Avalilability",
      text: "Our services are available 24/7, ensuring you have support whenever you need it.",
    },
    {
      image:icon2,
      title: "System Setting",
      text: "Tailor your experience by adjusting settings to match your preferences and workflow.",
    },
    {
      image:  icon3,
      title: "Flexible Access",
      text: "Access our resources seamlessly from your desktop, tablet or wherever you are.",
    },
    {
      image:  icon4,
      title: "Safe and Stable",
      text: "Count on our reliable and secure platform for peace of mind.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="seco-text">
          Featured Service
        </p>
        <h1 className="primary-heading">We provide the powerful featured service</h1>
        
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
