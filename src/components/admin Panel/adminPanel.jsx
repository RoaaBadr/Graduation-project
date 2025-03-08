import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
//import Title from "../title/title";
import AdminSideBar from "./sidebar/adminSidebar";
//import Footer from "../footer/Footer";

function AdminPanel() {
  return (
    <><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1"/>
    <div style={{minHeight:"100vh"}}>
      <div className="container text-start w-100 d-block me-auto">
      </div>
      <div className="container-lg d-flex  flex-md-column flex-lg-row gap-3 flex-wrap flex-md-nowrap w-100 mt-5">
        <div className="col-lg-3 col-xs-12 flex-shrink-0 centered">
          <AdminSideBar />
        </div>
        <div className="col-lg-9 col-xs-12 centered">
          
          {/* <AddJob/> */}
          {/* <AddCourses/> */}
          {/* <AddArticles/> */}
          {/* <Applications/> */}
          {/* <AddUser/> */}
          <Outlet/>
        </div>
      </div>
      </div>
    </>
  );
}

export default AdminPanel;