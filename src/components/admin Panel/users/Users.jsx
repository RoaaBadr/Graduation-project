import {
  faEdit,
  faPenToSquare,
  faSearch,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers, getUser } from "../../../redux/reducers/userSlice";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../../pagination/pagination";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queries, setQueries] = useState({
    page: 1,
    fieldValue: "",
    fieldName: "",
    searchBy: "userId",
    searchValue: "",
  });

  const handlePageChange = (page) => {
    setQueries((prevQueries) => ({ ...prevQueries, page }));
  };

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setQueries({
      ...queries,
      page: 1,
      searchValue: search,
    });
  };

  useEffect(() => {
    dispatch(getAllUsers(queries));
  }, [dispatch, queries]);

  const { users, pagination = {} } = useSelector((state) => state.user);
  const { total = 0, limit = 10, page = 1, pages = 1 } = pagination;

  const handleEditUser = (userId) => {
    dispatch(getUser(userId)).unwrap()
      .then(() => {
        navigate("/adminPanel/edit-user");
      });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser({ _id: userId })).unwrap();
      toast.info("User Successfully Deleted");
      dispatch(getAllUsers(queries));
    } catch (backendError) {
      toast.error(backendError.error);
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth);

  const handleMobileView = useCallback(() => {
    if (availableWidth <= 778) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [availableWidth]);

  useEffect(() => {
    const handleResize = () => {
      setAvailableWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);

  return (
    <>
      {isMobile ? (
        <div className="row m-0 mt-5 col-12" id="items">
          {users.length === 0 ? (
            <tr>
              <td colSpan="5">There is No Users To Display.</td>
            </tr>
          ) : (
            users?.map((user, index) => (
              <div className="col-12 text-light user-part" key={index}>
                <button
                  className={
                    user.accountStatus === "Active"
                      ? "table_btn publish_btn Active"
                      : "bg-secondary table_btn text-light"
                  }
                >
                  {user.accountStatus === "Active" ? "Active" : "inactive"}
                </button>
                <h4>Name</h4>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <div className="d-flex  justify-content-between">
                  <div>
                    <h4>isAdmin</h4>
                    <p>{user.isAdmin}</p>
                  </div>
                  <div>
                    <h4>User id </h4>
                    <p>{user._id}</p>
                  </div>
                </div>
                <div className="icons2 d-flex justify-content-end gap-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEditUser(user._id)}
                    className="table-icon"
                    style={{ color: "#bf9b30", cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteUser(user._id)}
                    className="table-icon"
                    style={{ color: "#bf9b30", cursor: "pointer" }}
                  />
                </div>
              </div>
            ))
          )}
          <Link to="/adminPanel/addUsers">
            <button
              className="btn row_btn col-12 text-light mt-4"
              type="button"
              style={{ background: "#bf9b30" }}
            >
              Create New user
            </button>
          </Link>
        </div>
      ) : (
        <div className="user-sec">
          <Link to="/adminPanel/addUsers">
            <button
              className="btn color-yellow ps-4 m-2 d-block pe-4 p-2 ms-auto"
              style={{ border: "1px solid #bf9b30" }}
            >
              {" "}
              Create new user
            </button>
          </Link>
          <div className="article-search d-lg-flex justify-content-lg-between">
            <h4 className="text-light">users</h4>
            <div className="search-div">
              <input
                type="number"
                placeholder="Search by userId"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{ borderRadius: "5px", padding: "5px" }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
                className="text-warning"
              />
            </div>
          </div>
          <div className="user-content">
            <table className="table table-borderless text-light mx-auto table-responsive-sm">
              <thead className="m-3">
                <tr>
                  <th className="col">Name</th>
                  <th className="col">Status</th>
                  <th className="col">User id</th>
                  <th className="col">IsAdmin</th>
                  <th className="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5">There is No Users To Display.</td>
                  </tr>
                ) : (
                  users?.map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstName}</td>
                      <td>
                        <button
                          className={
                            user.accountStatus === "Active"
                              ? ""
                              : "bg-secondary text-light"
                          }
                        >
                          {user.accountStatus === "Active"
                            ? "Active"
                            : "inActive"}
                        </button>
                      </td>
                      <td>{user.userId}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to="#" style={{ cursor: "pointer" }}>
                          <FontAwesomeIcon
                            onClick={() => handleEditUser(user._id)}
                            icon={faPenToSquare}
                            className="color-yellow"
                          />
                        </Link>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="color-yellow"
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination total={total} pages={pages} currentPage={page} limit={limit} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </>
  );
}
export default Users;
