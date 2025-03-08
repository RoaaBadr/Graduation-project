import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../sections/Navbar";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Do familiar surroundings sometimes seem strange, confusing, threatening or unreal to you?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 2,
    text: "Have you heard unusual sounds like banging, clicking, hissing, clapping or ringing in your ears?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 3,
    text: "Do things that you see appear different from the way they usually do?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 4,
    text: "Have you had experiences with telepathy, psychic forces, or fortune telling?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 5,
    text: "Have you felt that you are not in control of your own ideas or thoughts?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 6,
    text: "Do you have difficulty getting your point across, because you ramble or go off the track a lot when you talk?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 7,
    text: "Do you have strong feelings or beliefs about being unusually gifted or talented in some way?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 8,
    text: "Do you feel that other people are watching you or talking about you?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 9,
    text: "Do you sometimes get strange feelings on or just beneath your skin, like bugs crawling?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 10,
    text: "Do you sometimes feel suddenly distracted by distant sounds that you are not normally aware of?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 11,
    text: "Have you had the sense that some person or force is around you, although you couldn’t see anyone?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 12,
    text: "Do you worry at times that something may be wrong with your mind?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 13,
    text: "Have you ever felt that you don't exist, the world does not exist, or that you are dead?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 14,
    text: "Have you been confused at times whether something you experienced was real or imaginary?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 15,
    text: "Do you hold beliefs that other people would find unusual or bizarre?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 16,
    text: "Do you feel that parts of your body have changed in some way, or that parts of your body are working differently?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 17,
    text: "Are your thoughts sometimes so strong that you can almost hear them?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 18,
    text: "Do you find yourself feeling mistrustful or suspicious of other people?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 19,
    text: "Have you seen unusual things like flashes, flames, blinding light, or geometric figures?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 20,
    text: "Have you seen things that other people can't see or don't seem to see?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
  {
    id: 21,
    text: "Do people sometimes find it hard to understand what you are saying?",
    choices: [
      { text: "NO", score: 0 },
      { text: "YES", score: 1 },
    ],
    required: true,
  },
];

function Psychosis() {
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
          <h1 className="display-4">Psychosis & Schizophrenia Test</h1>

          <p className="lead">
            This test combines the insights of several prior efforts to research
            psychosis spectrum symptoms to bring you a single, composite test
            measuring psychotic occurrences across 10 different domains.
          </p>
          <p>
            <b>Medical Reviewer: </b>Kartic Rajput, M.D., Ph.D.
            <div class="vr"></div>
            <b>Updated</b> May 16, 2023
          </p>
          <hr className="my-4" />

          {showResults ? (
            <div className="md:w-[50%] w-full my-5 py-3 px-4 border border-5 ">
              <p className="primary-text">
                Your Results — Psychosis & Schizophrenia Test:
              </p>
              {totalScore <= 24 && (
                <>
                  <h2 className="primary-heading">Low/No Risk for Psychosis</h2>
                  <p className="secondary-text">
                    Your results indicate that you have none, or very few signs
                    of psychosis. <br />
                    These results are not meant to be a diagnosis. You can meet
                    with a doctor or therapist to get a diagnosis and/or access
                    therapy or medications. Sharing these results with someone
                    you trust can be a great place to start.
                  </p>
                </>
              )}
              {totalScore > 24 && (
                <>
                  <h2 className="primary-heading">High Risk for Psychosis</h2>
                  <p className="secondary-text">
                  Your results indicate that you are experiencing signs of psychosis.
                  <br />
                    These results are not meant to be a diagnosis. You can meet
                    with a doctor or therapist to get a diagnosis and/or access
                    therapy or medications. Sharing these results with someone
                    you trust can be a great place to start.
                  </p>
                </>
              )}

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
                      {question.id}
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

export default Psychosis;
