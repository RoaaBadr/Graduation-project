import React, { useState } from "react";
import Navbar from "../sections/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateArticle() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [tagsError, setTagsError] = useState(false);
  const [body, setBody] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [content, setContent] = useState("");
  const [imageError, setImageError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [error, setError] = useState("");


  const handleImageChange = (e) => {
    setImage(e.target.value);
    setImageError(false);
  };

  const handleIsPublishedChange = (e) => {
    setIsPublished(e.target.checked);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentError(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryError(false);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
    setTagsError(false);
  };

  const navigate =useNavigate();

  const handleCreate = () => {
    if (!image) {
      setImageError(true);
    }
    if (!title) {
      setTitleError(true);
    }
    if (!body) {
      setBodyError(true);
    }
    if (image && title && tags&& content &&category) {
      const formData = new FormData();
      formData.append("cover",image);
      formData.append("title",title);
      formData.append("tags",tags);
      formData.append("isPublished",isPublished);
      formData.append("content",content);
      formData.append("category",category);

      // Call API to create article here
      axios.post(`https://g-p-1k1q.onrender.com/GP/articles/createArticle`,formData,{
        withCredentials:true
      }).then((res)=>{
        
        navigate("/");

      }).catch((err)=>{

        //toaster
        setError(err.response.data.error)

      })


    }else{
      setError("please fill in all fields");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="create-article-container">
        <h1 className="create-article-title">Create Article Template </h1>
        <form className="create-article-form">

          {error && <h4 style={{color:"red"}}>{error}</h4>}

          <label className="create-article-label">
            Image (upload):
            <input
              type="file"
              value={image}
              onChange={handleImageChange}
              className="create-article-input"
            />
            {imageError && (
              <div className="create-article-error">Image Is Required</div>
            )}
          </label>
          <br />

          <label className="create-article-label">
            Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="create-article-input"
            />
            {titleError && (
              <div className="create-article-error">Title Is Required</div>
            )}
          </label>
          <br />

          <label className="create-article-label">
            Tags:
            <input
              type="text"
              value={tags}
              onChange={handleTagsChange}
              className="create-article-input"
            />
            {tagsError && <div className="create-article-error">Required</div>}
          </label>
          <br />

          <label className="create-article-label">
            Category:
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              className="create-article-input"
            />
            {categoryError && (
              <div className="create-article-error">Category is Required</div>
            )}
          </label>
          <br />

          <label className="create-article-label">
            Content:
            <input
              type="text"
              value={content}
              onChange={handleContentChange}
              className="create-article-input"
            />
            {contentError && (
              <div className="create-article-error">Required</div>
            )}
          </label>
          <br />

          <div style={{display:"flex"}}>
            <input
              type="checkbox"
              onClick={handleIsPublishedChange}
              className="create-article-input"
            />
            <label className="create-article-label">Is Published:</label>
          </div>
          <br />
        </form>
        <div className="create-article-btn">
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
