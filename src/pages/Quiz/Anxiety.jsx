import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../../sections/Navbar";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Feeling nervous, anxious, or on edge",
    choices: [
        { text: "..", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 3,
    text: "Worrying too much about different things",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 4,
    text: "Trouble relaxing",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
  {
    id: 7,
    text: "Feeling afraid, as if something awful might happen",
    choices: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly every day", score: 3 },
    ],
    required: true,
  },
];

function Anxiety() {
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAnswer = (questionId, choice) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: choice }));
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    Object.keys(answers).forEach((questionId) => {
      const choice = answers[questionId];
      totalScore += choice.score;
    });
    setTotalScore(totalScore);
  };

  const handleSubmit = () => {
    const errors = {};
    questions.forEach((question) => {
      if (question.required && !answers[question.id]) {
        errors[question.id] = "This field is required";
      }
    });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      calculateTotalScore();
      setShowResults(true);
    }
  };
  return (
    <>
      <Navbar />
      <section>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <h1 className="display-4">Anxiety Test (Self-Assessment)</h1>

          <p className="lead">
          Generalized Anxiety Disorder 7 (GAD-7) <br />
          (GAD-7) is a seven-item self-report questionnaire that
           uses some of the DSM-V criteria for GAD (General Anxiety Disorder)
            to measure worry and anxiety symptoms. It can also be used as a 
            screening tool and severity measure of panic, social anxiety, 
            and PTSD. GAD-7 is designed to assess the patient’s 
            health status during the previous 2 weeks.
          </p>
          <p>
            <b>Medical Reviewer: </b>Caroline Buzanko, Ph.D.
            <div class="vr"></div>
            <b>Updated</b> May 16, 2023
          </p>
          <hr className="my-4" />

          {showResults ? (
            <div className="md:w-[50%] w-full my-5 py-3 px-4 border border-5 ">
              <p className="primary-text">Your Results — Anxiety Test:</p>
              {totalScore <= 4 && <h2>Minimal Anxiety</h2>}
              {totalScore > 4 && totalScore <= 9 && <h2>Mild Anxiety</h2>}
              {totalScore > 9 && totalScore <= 14 && <h2>Moderate Anxiety</h2>}
              {totalScore > 14 && totalScore <= 21 && <h2>Severe Anxiety</h2>}

              <p>
              Adapted from Generalized Anxiety Disorder 7 (GAD-7) <br />
              Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues in 2006
              </p>
              <Link to={"/"}>
                <button className="secondary-button my-5 gap-2 d-md-flex justify-content-md-end">
                  Take Another Test <FiArrowRight />
                </button>
              </Link>
            </div>
          ) : (
            <div className="">
              <div className="md:w-[100%] w-full my-5 py-3 px-4 border border-5  ">
                {questions.map((question) => (
                  <div key={question.id} className="m-3 py-3 px-4 ">
                    <span className="h-8 w-8 bg-[#efe8d0] rounded-full inline-flex justify-center items-center text-green-800 mr-3">
                      {/*{question.id}*/}
                    </span>
                    {question.text}

                    {question.choices.map((choice) => (
                      <div key={question.id} className="my-3 px-7 ">
                        <label className="container">
                          {choice.text}
                          <input
                            className="radio-input"
                            type="radio"
                            name={question.id}
                            value={choice.text}
                            onChange={() => handleAnswer(question.id, choice)}
                            required
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    ))}
                    {errors[question.id] && (
                      <div className="text-red-500">{errors[question.id]}</div>
                    )}
                    <hr />
                  </div>
                ))}
                <div className="my-3 px-9 ">
                  <p>
                    This quiz is not a diagnostic tool. Mental health disorders
                    can only be diagnosed by qualified mental health
                    professionals. HealthCentral believes assessments can be a
                    valuable first step toward getting treatment. All too often
                    people stop short of seeking help out of fear their concerns
                    aren’t legitimate or severe enough to warrant professional
                    intervention.
                    <br />
                    <br />
                    The contact information provided above will be used by
                    HealthCentral Corporation to provide updates and marketing.
                    By submitting this request, you consent to receive
                    communications from us. For more information see our{" "}
                    <a href="https://www.healthcentralcorp.com/privacy-policy">
                      Privacy Policy.
                    </a>
                  </p>

                  <button
                    onClick={handleSubmit}
                    className="secondary-button gap-2 d-md-flex justify-content-md-end"
                  >
                    Show Results <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Anxiety;
