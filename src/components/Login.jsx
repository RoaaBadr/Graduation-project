import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import myGif from "../assets/Innovation-pana.svg";
import logo from "../assets/logo-Nafsi.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as Components from "./Component.jsx";
import { MDBInput } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducers/authSlice.js"; // Import login action

export const Login = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // useNavigate for navigation
  const { loading, isAuthenticated } = useSelector((state) => state.auth); // Redux state selectors
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handleSubmit = async (values) => {
    setError(null);
    console.log("Login form values:", values); // Add console log here
    try {
      await dispatch(loginUser(values)); // Dispatch login action
      // After successful login, handle navigation based on user role
      navigate("/profile"); // Redirect to user profile page
    } catch (error) {
      console.error("There was an error during login!", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={handleSubmit}
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
                            Login To Start With Nafsy
                          </h1>
                          <div className="form-outline mb-4">
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
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />

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
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error"
                            />

                            <Components.Anchor >
                              Forget the password?
                            </Components.Anchor>
                          </div>

                          {error && <div className="error">{error}</div>}

                          <div
                            className="container"
                            style={{
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <button
                              type="submit"
                              className="signup-btn"
                              style={{
                                padding: "1rem 3rem",
                                width: "auto",
                                margin: "1rem 1rem",
                              }}
                              disabled={loading}
                            >
                              {loading ? "Logging in..." : "Sign in"}
                            </button>
                           
                            <button
                              type=""
                              className="face-btn"
                              style={{
                                padding: "0.2rem 2.8rem",
                                width: "auto",
                                margin: "1rem 1rem",
                              }}
                            > <Link to={"/face"}>
                              Face Login
                              </Link>
                            </button>
                            
                          </div>
                          <div className="line"></div>
                          <Components.GoogleButton />
                          <Components.FacebookButton />
                          <div className="text-center">
                            <p className="parag">
                              Don't have an account?
                              <Link to={"/sign-up"}>
                                <span className="space">Sign up</span>
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

