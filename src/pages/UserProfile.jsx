import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
} from "mdb-react-ui-kit";

axios.defaults.withCredentials = true;

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // To toggle edit mode
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: 0,
    phone: "",
    preference: [],
    keywords: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://g-p-1k1q.onrender.com/GP/user/getme");
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching user data!", error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      await axios.patch("https://g-p-1k1q.onrender.com/GP/user/update-me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axios.get("https://g-p-1k1q.onrender.com/GP/user/getme");
      setUser(response.data.user);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.error("There was an error uploading the image!", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode && user) {
      // Populate form data when entering edit mode
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        phone: user.phone,
        preference: user.preference,
        keywords: user.keywords,
      });
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      // Prepare updated user data without email
      const updatedUserData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        age: formData.age,
        phone: formData.phone,
        preference: formData.preference,
        keywords: formData.keywords,
      };

      await axios.patch("https://g-p-1k1q.onrender.com/GP/user/update-me", updatedUserData);
      const response = await axios.get("https://g-p-1k1q.onrender.com/GP/user/getme");
      setUser(response.data.user);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.error("There was an error updating user data!", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <MDBSpinner grow />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <div className="position-relative">
                    <MDBCardImage
                      src={user.profileimage || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                      alt="avatar"
                      className="rounded-circle border"
                      style={{ width: "150px", cursor: "pointer" }}
                      fluid
                      onClick={handleEditToggle}
                    />
                    {editMode && (
                      <div className="position-absolute top-0 start-50 translate-middle">
                        <input type="file" onChange={handleImageChange} />
                        <MDBBtn outline className="ms-1 my-3" onClick={handleImageUpload}>
                          <MDBIcon icon="upload" className="me-2" />Change Photo
                        </MDBBtn>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1 my-3">
                      <MDBIcon icon="sign-out-alt" className="me-2" />Sign out
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {!editMode ? (
                        <MDBCardText className="text-muted">{user.firstname}</MDBCardText>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.firstname}
                          onChange={(e) => handleFieldChange("firstname", e.target.value)}
                        />
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {!editMode ? (
                        <MDBCardText className="text-muted">{user.lastname}</MDBCardText>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.lastname}
                          onChange={(e) => handleFieldChange("lastname", e.target.value)}
                        />
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {!editMode ? (
                        <MDBCardText className="text-muted">{user.age}</MDBCardText>
                      ) : (
                        <input
                          type="number"
                          className="form-control"
                          value={formData.age}
                          onChange={(e) => handleFieldChange("age", parseInt(e.target.value))}
                        />
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{user.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {!editMode ? (
                        <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                        />
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {!editMode && (
                    <MDBBtn onClick={handleEditToggle} className="mb-3">
                      Edit Profile
                    </MDBBtn>
                  )}
                  {editMode && (
                    <MDBBtn onClick={handleUpdateProfile} className="mb-3">
                      Save Changes
                    </MDBBtn>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}
