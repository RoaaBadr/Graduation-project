import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Updated to useNavigate
import axios from "axios";
import myGif from "../assets/login-pana-new.svg";
import logo from "../assets/logo-Nafsi.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Components from "./Component.jsx";
import { MDBInput } from "mdb-react-ui-kit";
import { useAuth } from "../Context/AuthContext/AuthContext.jsx";

axios.defaults.withCredentials = true;

export const Signup = () => {
    const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Use useNavigate

  const validateStep1 = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Please Enter your password"),
  });

  const validateStep2 = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    age: Yup.number().required("Required"),
    phoneNumber: Yup.string().required("Required"),
  });

const handleSubmitStep1 = async (values) => {
  setError(null);
  try {

    await axios.post("https://g-p-1k1q.onrender.com/GP/auth/register", {
      email: values.email,
      password: values.password,
    });

    const loginResponse = await axios.post("https://g-p-1k1q.onrender.com/GP/auth/login", {
      email: values.email,
      password: values.password,
    });
          login(loginResponse.data.user);

    setUserId(loginResponse.data._id);
    setStep(2);
  } catch (error) {
    console.error("There was an error during registration or login!", error.response?.data?.error);
    setError(error.response?.data?.error[0]?.message ||error.response?.data?.error|| "An error occurred");
  }
};

  const handleSubmitStep2 = async (values) => {
    setError(null);
    try {
      await axios.patch(`https://g-p-1k1q.onrender.com/GP/user/update-me`, {
        firstname: values.firstName,
        lastname: values.lastName,
        age: values.age,
        phone: values.phoneNumber,
      });

      navigate("/"); // Redirect to home after successful registration
    } catch (error) {
    console.error("There was an error during registration or login!", error.response?.data?.error);
    setError(error.response?.data?.error[0]?.message ||error.response?.data?.error|| "An error occurred");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
      }}
      validationSchema={step === 1 ? validateStep1 : validateStep2}
      onSubmit={step === 1 ? handleSubmitStep1 : handleSubmitStep2}
    >
      {({ handleChange, handleBlur, values }) => (
        <section>
          <div className="px-4 py-5 px-md-1">
            <div className="">
              <div className="row">
                <div className="left col-lg-6 mb-5 mb-lg-0">
                  <img src={myGif} alt="my-gif" />
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="container card-body">
                    <div className="card-body py-9 px-md-5">
                      <Form className="Form">
                        <div className="row">
                          <div className="logo-form">
                            <Link to={"/"}>
                              <img src={logo} alt="my-gif" />
                            </Link>
                          </div>

                          <h1
                            className="form-header"
                            style={{ marginBottom: "2.7rem" }}
                          >
                            {step === 1 ? "Step 1: Email and Password" : "Step 2: Additional Information"}
                          </h1>

                          {step === 1 && (
                            <>
                              <MDBInput
                                wrapperClass="mb-4"
                                label="Your Email"
                                size="lg"
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              <ErrorMessage name="email" component="div" className="error" />

                              <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                size="lg"
                                id="password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                              <ErrorMessage name="password" component="div" className="error" />
                            </>
                          )}

                          {step === 2 && (
                            <>
                              <MDBInput
                                wrapperClass="mb-4"
                                label="First Name"
                                size="lg"
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                              />
                              <ErrorMessage name="firstName" component="div" className="error" />

                              <MDBInput
                                wrapperClass="mb-4"
                                label="Last Name"
                                size="lg"
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                              />
                              <ErrorMessage name="lastName" component="div" className="error" />

                              <MDBInput
                                wrapperClass="mb-4"
                                label="Age"
                                size="lg"
                                id="age"
                                name="age"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                              />
                              <ErrorMessage name="age" component="div" className="error" />

                              <MDBInput
                                wrapperClass="mb-4"
                                label="Phone Number"
                                size="lg"
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                              />
                              <ErrorMessage name="phoneNumber" component="div" className="error" />
                            </>
                          )}

                          {error && <div className="error">{error}</div>}

                          <button
                            type="submit"
                            className="signup-btn"
                            style={{
                              padding: "1rem 3rem",
                              margin: "1rem 0rem",
                              width: "auto",
                            }}
                          >
                            {step === 1 ? "Next Step" : "Sign up"}
                          </button>
                          <div className="line"></div>
                          <Components.GoogleButton />
                          <Components.FacebookButton />
                          <div className="text-center">
                            <p className="parag">
                              Already have an account?
                              <Link to={"/log-in"}>
                                <span className="space">Log In</span>
                              </Link>
                            </p>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};

export default Signup;
