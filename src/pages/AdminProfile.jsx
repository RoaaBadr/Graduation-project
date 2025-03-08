import Navbar from "../sections/Navbar";
import { Link } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function createData(name, id, btn) {
  return { name, id, btn };
}

const rows = [
  createData("Title 1", 1),
  createData("Title 2", 2),
  createData("Title 3", 3),
  createData("Title 4", 4),
  createData("Title 5", 5),
];
export default function AdminProfile() {

  const deleteArtical=(id)=>{
    console.log(id);
  }

  return (
    <>
      <Navbar />
      <section className="boarder">
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCol className="d-flex justify-content-center mb-2 my-5">
                  <MDBCardText>Profile Image</MDBCardText>
                </MDBCol>

                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    alt="avatar"
                    className="rounded-circle border"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1 my-3">
                      Sign out
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCol className="d-flex justify-content-center mb-2 my-5">
                  <MDBCardText>User Information</MDBCardText>
                </MDBCol>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        First + Last Name
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">User Age</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        example@example.com
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (097) 234-5678
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4">
                <MDBCol className="d-flex justify-content-center mb-2 my-5">
                  <MDBCardText>Admin Functions</MDBCardText>
                </MDBCol>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol>
                      <MDBCardText>Articles List</MDBCardText>
                      <hr />
                      {/*Articles List */}
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Article Name</TableCell>
                              <TableCell align="right">ID</TableCell>
                              <TableCell align="right">{/*Delete Button Display */}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.id}
                                </TableCell>
                                <TableCell align="right">
                                  <button onClick={()=>{deleteArtical(row?.id)}}
                                    className="delete-btn ms-1 my-3"
                                  ><DeleteIcon/> Delete</button>
                                    
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </MDBCol>

                    <div className="d-flex justify-content-end mb-2">
                      <Link to={"/create-article"}>
                        <button
                          type="button"
                          onClick={() => setShowModal(true)}
                          className="create-new-btn ms-1 my-3 "
                        ><AddIcon />
                          Create New
                        </button>
                      </Link>
                    </div>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Videos List</MDBCardText>
                      {/*Videos List */}
                    </MDBCol>
                    <hr />
                    <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Video Name</TableCell>
                              <TableCell align="right">ID</TableCell>
                              <TableCell align="right">{/*Delete Button Display */}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.id}
                                </TableCell>
                                <TableCell align="right">
                                  <button
                                    className="delete-btn ms-1 my-3"
                                  ><DeleteIcon/> Delete</button>
                                    
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="d-flex justify-content-end mb-2">
                      <Link to={"/create-video"}>
                        <button
                          type="button"
                          onClick={() => setShowModal(true)}
                          className="create-new-btn ms-1 my-3 "
                        ><AddIcon />
                          Create New
                        </button>
                      </Link>
                    </div>
                    </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
