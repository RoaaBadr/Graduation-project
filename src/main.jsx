/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import "./design/signup.css";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { currentUser } from "./redux/reducers/authSlice";
import { useSelector } from "react-redux";
import Store from './redux/store';
import { Provider } from 'react-redux';
import Articles from './components/admin Panel/articles/article.jsx';

import PTSD from "./pages/Quiz/PTSD.jsx";
import ADHD from "./pages/Quiz/ADHD.jsx";
import Anxiety from "./pages/Quiz/Anxiety.jsx";
import Bipolar from "./pages/Quiz/Bipolar.jsx";
import Depression from "./pages/Quiz/Depression.jsx";
import Psychosis from "./pages/Quiz/Psychosis.jsx";

import NoPage from "./pages/NoPage.jsx";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import Recipe from "./pages/Recipe.jsx";
import FetchA from "./pages/ArticleFetch.jsx";
import FetchV from "./pages/VideoFetch.jsx";
import Profile from "./components/profile/profile.jsx";
import AddArticles from "./components/admin Panel/add articles/AddArtciles.jsx";
import UpdateArticle from './components/admin Panel/update article/UpdateAricle.jsx';
import AddUsers from "./components/admin Panel/add users/addUser.jsx";
import EditUser from "./components/admin Panel/edit users/editUser.jsx";
import Users from "./components/admin Panel/users/Users.jsx";
import AdminPanel from "./components/admin Panel/adminPanel.jsx";
import Face from "./pages/Face/Face.jsx";

import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";

function App() {
    const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth); // Get the entire auth state
  const { user, isAuthenticated } = auth || {}; // Destructure user and isAuthenticated, with fallback to empty object
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentRoute = location.pathname;
  const handleStep1Submit = (values) => {
    // Handle step 1 form submission logic here
  };


  return (
    <AuthProvider>
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/videos/:id" element={<Video />} />
          <Route path="/sign-up" element={<Signup onSubmit={handleStep1Submit} />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/blogs" element={<FetchA />} />
          <Route path="/video" element={<FetchV />} />

          <Route path="/ptsd" element={<PTSD />} />
          <Route path="/adhd" element={<ADHD />} />
          <Route path="/anxiety" element={<Anxiety />} />
          <Route path="/bipolar" element={<Bipolar />} />
          <Route path="/depression" element={<Depression />} />
          <Route path="/psychosis" element={<Psychosis />} />
          <Route path="/face" element={<Face />} />
          
          <Route path="/profile" element={<Profile />} />
          isAuthenticated && user?.isAdmin ? (
            <>
            <Route path="/adminPanel" element={<AdminPanel />}>
  					<Route path="articles" element={<Articles />} />
              <Route path="addarticles" element={<AddArticles />} />
						  <Route path="updatearticle" element={<UpdateArticle />} />
              <Route path="users" element={<Users />} />
              <Route path="addusers" element={<AddUsers />} />
              <Route path="edit-user" element={<EditUser />} />
            </Route>
            </>
          )
        </Routes>
    </div>
    </AuthProvider>
  );
}

ReactDOM.render(
  <Provider store={Store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root"));
