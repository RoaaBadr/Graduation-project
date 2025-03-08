import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../../sections/Navbar";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 4,
    text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 5,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 6,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 7,
    text: "How often do you make careless mistakes when you have to work on a boring or difficult project?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 8,
    text: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 9,
    text: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 10,
    text: "How often do you misplace or have difficulty finding things at home or at work?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 11,
    text: "How often are you distracted by activity or noise around you?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 12,
    text: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 13,
    text: "How often do you feel restless or fidgety?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 14,
    text: "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 15,
    text: "How often do you find yourself talking too much when you are in social situations?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 16,
    text: "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
  {
    id: 17,
    text: "How often do you have difficulty waiting your turn in situations when turn taking is required?",
    choices: [
      { text: "NEVER", score: 0 },
      { text: "RARELY", score: 0 },
      { text: "SOMETIMES", score: 1 },
      { text: "OFTEN", score: 1 },
      { text: "VERY OFTEN", score: 1 },
    ],
    required: true,
  },
];

function ADHD() {
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
          <h1 className="display-4">ADHD Test (Self-Assessment)</h1>

          <p className="lead">
          Answer the quiz questions below to see if you have 
          symptoms of attention deficit hyperactivity disorder
           (ADHD).
          </p>
          <p>
            <b>Medical Reviewer: </b>Barton Herskovitz, M.D.
            <div class="vr"></div>
            <b>Updated</b> May 16, 2023
          </p>
          <hr className="my-4" />

          {showResults ? (
            <div className="md:w-[50%] w-full my-5 py-3 px-4 border border-5 ">
              <p className="primary-text">Your Results — ADHD Test:</p>
              {totalScore < 4 && <h2>ADHD unlikely</h2>}
              {totalScore >= 4 && <h2>ADHD likely</h2>}
              <p>
              These results are not meant to be a diagnosis. 
              You can meet with a doctor or therapist to get a 
              diagnosis and/or access therapy or medications. 
              Sharing these results with someone you trust 
              can be a great place to start.
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
                    <span className="h-8 w-8 bg-[#efe8d0] rounded-full inline-flex justify-center items-center mr-3">
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

export default ADHD;
