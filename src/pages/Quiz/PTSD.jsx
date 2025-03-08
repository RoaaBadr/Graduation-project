import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../../sections/Navbar";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Had nightmares about the event(s) or thought about the event(s) when you did not want to?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 }
    ],
    required: true,
  },{
    id: 2,
    text: "Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },{
    id: 3,
    text: "Been constantly on guard, watchful, or easily startled?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },{
    id: 4,
    text: "Felt numb or detached from people, activities, or your surroundings?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },{
    id: 5,
    text: "Felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
];

function PTSD() {
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
          <h1 className="display-4">PTSD (Post-Traumatic Stress Disorder) Test</h1>

          <p className="lead">
                Complete the following to get an assessment of the likelihood 
                that you are showing signs of Post-Traumatic Stress Disorder.
          </p>
          <p>
            <b>Medical Reviewer: </b>Mirna Carranza, Ph.D.
            <div class="vr"></div>
            <b>Updated</b> May 24, 2022
          </p>
          <hr className="my-4" />

          {showResults ? (
            <div className="md:w-[50%] w-full my-5 py-3 px-4 border border-5 ">
              <p className="primary-text">Your Results — PTSD Test:</p>
              {totalScore < 3 && <h2>PTSD Negative</h2>}
              {totalScore >= 3 && <h2>PTSD Positive</h2>}

              <p>
              Your results indicate that you are experiencing some signs of PTSD. <br />
              These results are not meant to be a diagnosis. You can meet with a doctor or 
              therapist to get a diagnosis and/or access therapy or medications. Sharing 
              these results with someone you trust can be a great place to start.
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

export default PTSD;
