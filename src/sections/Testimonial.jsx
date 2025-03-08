import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Mental from "../assets/Mental-health.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Testimonail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const content = [
    {
      id: 1,
      link: "/ptsd",
      title: "PTSD Test",
      subtitle: "For people experiencing ongoing distress after a traumatic life event.",
      number: "5 ",
      time: "1 ",
    },
    {
      id: 2,
      link: "/depression",
      title: "Depression Test",
      subtitle: "For people experiencing overwhelming sadness or despair, low energy, or negative self-image.",
      number: "10",
      time: "3 ",
    },
    {
      id: 3,
      link: "/anxiety",
      title: "Anxiety Test",
      subtitle: "For people experiencing extreme worry or fear that affects their abillity to function day-to-day.",
      number: "7 ",
      time: "2 ",
    },
    {
      id: 4,
      link: "/psychosis",
      title: "Psychosis Test",
      subtitle: "For people who feel like their brain is playing tricks on them (seeing or believing things that don't seem real.)",
      number: "21 ",
      time: "7 ",
    },
    {
      id: 5,
      link: "/adhd",
      title: "ADHD Test",
      subtitle: "For people of all ages who have trouble focusing, remembering things, complete tasks, and/or sitting still.",
      number: "17 ",
      time: "6 ",
    },
    {
      id: 6,
      link: "/bipolar",
      title: "Bipolar Test",
      subtitle: "For people experiencing extreme mood swings or unusual shifts in mood and energy.",
      number: "13 ",
      time: "6 ",
    },
  ];
  const handleStartQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/quiz");
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <div class="ag-format-container">
        <div className="work-section-top">
          <p className="seco-text">Take a Test</p>
          <h1 className="primary-heading">
            Take a Mental Health Test          
          </h1>
        </div>
        <div class="ag-courses_box">
          {content.map((item) => (
            <div class="ag-courses_item">
              <Link to={item.link} class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>
                <div class="ag-courses-item_title">{item.title}</div>
                <div className="secondary-text">{item.subtitle}</div>
                <div class="ag-courses-item_date-box">
                  <hr />
                  <span class="ag-courses-item_date">
                    <HelpOutlineIcon /> {item.number} Questions
                    <span className="left-side">
                      <AccessTimeIcon /> {item.time} min
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonail;
