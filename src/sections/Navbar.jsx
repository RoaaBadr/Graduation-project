import React, { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import logoImg from '../assets/logo-Nafsi.png';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate =useNavigate();
  const handleNavigationAndLogout =async () => {
         await axios.post(
        "https://g-p-1k1q.onrender.com/GP/auth/logout",
        {
        }
      );
    navigate("/");
    logout()
  }
  
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "Videos",
      icon: <VideoLibraryRoundedIcon />,
      link: "/video",
    },
    {
      text: "Articles",
      icon: <NewspaperRoundedIcon />,
      link: "/blogs",
    },
    {
      text: "Sign Up",
      icon: <SensorOccupiedIcon />,
      link: "/sign-up",
    },
    {
      text: "Log In",
      icon: <LoginIcon />,
      link: "/log-in",
    },
  ];

  
  
  return (
    <>
      <nav>
        <NavLink to="/" className={"logo"}>
          <div className="nav-logo-container">
            <img src={logoImg} alt=""  />
            <p></p>
          </div>
        </NavLink>
        <div className="navbar-links-container">
          <div className="topnav-centered">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Articles</NavLink>
            <NavLink to="/video">Videos</NavLink>
          </div>
          {!user &&
          <div className="topnav-right">
            <NavLink to="/log-in">Log In</NavLink>
            <button className="primary-button">
              <NavLink to="/sign-up">Sign Up</NavLink>
            </button>
          </div>
          }
          {user && <button onClick={handleNavigationAndLogout}>Logout</button>}
        </div>
        
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item,idx) => (
                <Link key={idx} to={item.link}>
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon> {item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
