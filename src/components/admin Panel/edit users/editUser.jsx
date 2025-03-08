import "./editUser.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/reducers/userSlice";

function EditUser() {
  const { getUser: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/adminPanel/users");
    } else {
      setIsUserLoaded(true);
    }
  }, [user, navigate]);

  const initialUserDataRef = useRef({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userId: user?.userId ?? "",
    role: user?.role ?? "Student",
    accountStatus: user?.accountStatus ?? "Inactive",
    score: user?.score ?? 0,
    mobileNumber: user?.mobileNumber ?? "",
    password: user?.password ?? "",
  });

  useEffect(() => {
    if (user) {
      initialUserDataRef.current = {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        userId: user?.userId ?? "",
        role: user?.role ?? "Student",
        accountStatus: user?.accountStatus ?? "Inactive",
        score: user?.score ?? 0,
        mobileNumber: user?.mobileNumber ?? "",
        password: user?.password ?? "",
      };
    }
  }, [user]);

  const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm();

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );
    if (Object.keys(filteredData).length === 0) {
      toast.warn("No data to submit.");
      return;
    }
    if (filteredData.password === filteredData.passwordConfirmation) {
      delete filteredData.passwordConfirmation;
      delete filteredData.password;

      dispatch(updateUser({ _id: user._id, userData: filteredData }))
        .unwrap()
        .then(() => {
          toast.success("Profile Successfully Updated");
          reset();
        })
        .catch((backendError) => {
          console.error("Backend error:", backendError);
          toast.error(backendError.error);
        });
    } else {
      toast.error("Passwords do not match.");
      return;
    }
  };

  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="course-details col-md-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="inputs-container row p-3 text-white bg-opacity-25 bg-black"
          >
            <div className="mb-3 d-flex justify-content-between course-header">
              <div>
                <h5>Edit User Details</h5>
                <div className="user-line"></div>
              </div>
            </div>

            <div className="form-section col-md-5 col-lg-5 col-12">
              <label htmlFor="fName">First Name</label>
              <input
                defaultValue={initialUserDataRef.current.firstName}
                type="text"
                id="fName"
                required
                {...register("firstName")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-5 col-lg-5 col-12">
              <label htmlFor="lName">Last Name</label>
              <input
                defaultValue={initialUserDataRef.current.lastName}
                type="text"
                id="lName"
                {...register("lastName")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-2 col-lg-2 col-12">
              <label htmlFor="status">Status</label>
              <select
                {...register("accountStatus")}
                className="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="status"
                aria-label=".form-select"
              >
                <option selected={initialUserDataRef.current.accountStatus === "Active"} value="Active" className="bg-secondary">
                  Active
                </option>
                <option selected={initialUserDataRef.current.accountStatus === "Inactive"} value="Inactive" className="bg-secondary">
                  Inactive
                </option>
              </select>
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="score">Score</label>
              <input
                defaultValue={initialUserDataRef.current.score}
                type="number"
                id="score"
                {...register("score")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="role">Role</label>
              <select
                className="form-select text-white bg-secondary bg-opacity-25 border-0"
                id="role"
                {...register("role")}
                aria-label=".form-select"
              >
                <option selected={initialUserDataRef.current.role === "Student"} value="Student" className="bg-secondary">
                  Student
                </option>
                <option selected={initialUserDataRef.current.role === "Admin"} value="Admin" className="bg-secondary">
                  Admin
                </option>
                <option selected={initialUserDataRef.current.role === "Instructor"} value="Instructor" className="bg-secondary">
                  Instructor
                </option>
              </select>
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="mobNum">Mobile Number</label>
              <input
                defaultValue={initialUserDataRef.current.mobileNumber}
                type="text"
                id="mobNum"
                {...register("mobileNumber")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="user-id">User ID</label>
              <input
                defaultValue={initialUserDataRef.current.userId}
                type="text"
                id="userId"
                {...register("userId")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="password">Password</label>
              <input
                defaultValue={initialUserDataRef.current.password}
                type="password"
                id="password"
                {...register("password")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="form-section col-md-6 col-lg-6 col-12">
              <label htmlFor="password-conf">Password Confirmation</label>
              <input
                type="password"
                id="passwordConfirmation"
                {...register("passwordConfirmation")}
                className="form-control bg-secondary bg-opacity-25"
              />
            </div>

            <div className="buttons row gap-3 justify-content-end mx-auto mt-3">
              <button
                type="reset"
                className="btn cancel-btn col-md-2 col-lg-2 col-12 text-white order-last order-md-first order-lg-first"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="btn save-btn col-md-2 col-lg-2 col-12 text-white ml-md-3 mb-3 mb-md-0 mb-lg-0"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
