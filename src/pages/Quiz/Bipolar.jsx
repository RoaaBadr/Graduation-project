import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../../sections/Navbar";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "You felt so good or hyper that other people thought you were not your normal self or were so hyper that you got into trouble?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 2,
    text: "You were so irritable that you shouted at people or started fights or arguments?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 3,
    text: "You felt much more self-confident than usual?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 4,
    text: "You got much less sleep than usual and found you didn’t really miss it?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 5,
    text: "You were much more talkative or spoke much faster than usual?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 6,
    text: "Thoughts raced through your head or you couldn’t slow your mind down?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 7,
    text: "You were so easily distracted by things around you that you had trouble concentrating or staying on track?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 8,
    text: "You had much more energy than usual?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 9,
    text: "You were much more interested in sex than usual?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 10,
    text: "Spending money got you or your family into trouble?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 11,
    text: "You did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 12,
    text: "You were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },
  {
    id: 13,
    text: "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
    choices: [
        { text: "NO", score: 0 },
        { text: "YES", score: 1 }
    ],
    required: true,
  },

];


function Bipolar() {
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
          <h1 className="display-4">Bipolar Test</h1>

          <p className="lead">
            This depression quiz is based on the Depression Screening Test
            developed by Ivan K. Goldberg, MD, a renowned psychiatrist.
          </p>
          <p>
            <b>Medical Reviewer: </b>Kartic Rajput, M.D., Ph.D.<div class="vr"></div>
            <b>Updated</b>{" "}
            May 16, 2023
          </p>
          <hr className="my-4" />

          {showResults ? (
            <div className="md:w-[50%] w-full my-5 py-3 px-4 border border-5 ">
              <p className="primary-text">Your Result:</p>
              {totalScore <= 4 && <h2>Minimal depression</h2>}
              {totalScore > 4 && totalScore <= 9 && <h2>Mild depression</h2>}
              {totalScore > 9 && totalScore <= 14 && (
                <h2>Moderate depression</h2>
              )}
              {totalScore > 14 && totalScore <= 19 && (
                <h2 className="">Moderately severe depression</h2>
              )}
              {totalScore > 19 && totalScore <= 27 && (
                <h2>Severe depression</h2>
              )}
              <p>
                Your answers suggest you are suffering from severe depression.
                It is important that you schedule an appointment with your
                doctor or a mental health worker now.
              </p>
              <Link to={"/"}>
              <button
                className="secondary-button my-5 d-grid gap-2 d-md-flex justify-content-md-end"
              >
                Take Another Test <FiArrowRight />
              </button></Link>
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
                    <div className="line-style"></div>
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
                    className="secondary-button d-grid gap-2 d-md-flex justify-content-md-end"
                  >
                    View Results <FiArrowRight />
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

export default Bipolar;
