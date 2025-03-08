import React, { useState } from "react";
import Navbar from "../sections/Navbar.jsx";
import { Link } from "react-router-dom";

export default function CreateVideo() {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrlError, setVideoUrlError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    setVideoUrlError(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError(false);
  };

  const handleCreate = () => {
    if (!videoUrl) {
      setVideoUrlError(true);
    }
    if (!title) {
      setTitleError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }
    if (videoUrl && title && description) {
      // Call API to create video here
      console.log("Video created successfully!");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="create-video-container">
        <h1 className="create-video-title">Create Video Template</h1>
        <form className="create-video-form">
          <label className="create-video-label">
            Video URL (YouTube):
            <input
              type="text"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              className="create-video-input"
            />
            {videoUrlError && (
              <div className="create-video-error">Required</div>
            )}
          </label>
          <br />
          <label className="create-video-label">
            Video Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="create-video-input"
            />
            {titleError && <div className="create-video-error">Required</div>}
          </label>
          <br />
          <label className="create-video-label">
            Video Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="create-video-input"
            />
            {descriptionError && (
              <div className="create-video-error">Required</div>
            )}
          </label>
          <br />
        </form>
        <div className="create-video-btn">
          <Link to={"/admin-profile"}>
            <button
              className="create-btn-close"
              onClick={() => console.log("Modal closed")}
            >
              Close
            </button>
          </Link>

          <button className="create-btn-create" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}
