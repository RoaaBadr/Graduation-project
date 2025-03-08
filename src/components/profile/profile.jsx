import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import Navbar from "../../sections/Navbar.jsx";

import {
  faPenToSquare,
  faEnvelope,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
import { currentUser } from "../../redux/reducers/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null); // Local state for user

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handleUser = async () => {
      try {
        const fetchedUser = await dispatch(currentUser()).unwrap();
        setUser(fetchedUser); // Set user in context state

        console.log(fetchedUser); // Ensure fetchedUser contains expected data
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
      setIsLoading(false);
    };

    handleUser();
  }, [dispatch]); // Ensure to include dispatch in dependencies array
  console.log(user);

  useEffect(() => {
    if (user) {
      console.log(user);
      setValue("age", user.age || "");
      setValue("email", user.email || "");
      setValue("mobile", user.mobileNumber || "");
    }
  }, [user, setValue]);

  const imageInput = useRef();

  const onSubmit = (data) => {
    if (Object.keys(data).length === 0) {
      toast.warn("No data to submit.");
      return;
    }

    // Prepare data for submission
    const formData = new FormData();
    formData.append("age", data.age);
    formData.append("email", data.email);
    formData.append("mobileNumber", data.mobile);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    // Dispatch update action
    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch((backendError) => {
        toast.error(backendError.error);
      });
  };

  const imageUpload = () => {
    imageInput.current.click();
  };

  const imageDisplay = (e) => {
    setValue("image", e.target.files);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Add loading state if user is not yet loaded
  }

  return (
    <>
            <Navbar/>

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"
      />

      <form className="profilebody pt-5 my-5 " onSubmit={handleSubmit(onSubmit)}>
            <h3>Update User Information</h3>
            <span>{/*style={{ display: "none" }}*/}</span>
            {/*
            <span className="col-sm-12 ps-3 col-md-11">
              <h5 className="" style={{ textTransform: "capitalize" }}>
                {/*!!! Not Displayed
                user Name Here
                {user && `${user.firstname} ${user.lastname}`}
              </h5>
            </span>*/}

        <div className="profiledata mt-1 position-relative  ">
          <div className="row gx-0 p-5 gy-3 ">
            <h5>
              <PermIdentityIcon className="mx-1" style={{ color: "#75550b" }} />
              User Information
            </h5>{" "}
            <hr style={{ color: "#75550b" }} />
            <div className="d-flex justify-content-start my-4">
              <img
                src={
                  user && user.profileImage
                    ? `http://localhost:4000/seff-academy/uploads/${user.profileImage}`
                    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                }
                className="rounded-circle "
                alt=""
                width="100"
                height="100"
                style = {
                  {border:"#75550b 2px solid" , padding: "5px", backgroundColor: "#fff"}
                }
                
              />
              <input
                onChange={imageUpload}
                type="file"
                accept="image/*"
                ref={imageInput}
                {...register("image")}
                className="pen "
              />
            </div>
<div className="container" >
            <div className="form-group">
              <div className="">
                <label className="">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="">
                <label className="">Age</label>
                <input
                  type="text"
                  className={`form-control ${errors.age ? "is-invalid" : ""}`}
                  {...register("age")}
                />
                {errors.age && (
                  <div className="invalid-feedback">{errors.age.message}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="">
                <label className="">Mobile Number</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                  {...register("mobile")}
                />
                {errors.mobile && (
                  <div className="invalid-feedback">
                    {errors.mobile.message}
                  </div>
                )}
              </div>
              </div>
              
            </div>

          </div>
          <button className="text-uppercase edit" type="submit">
              Save Changes
            </button>

            <button className="text-uppercase edit" type="button" 
                  style={{float:"right", backgroundColor:"#315328"}}>
             <Link to={"/face"}> Enroll</Link>
            </button>
        </div>

      </form>
    </>
  );
}
