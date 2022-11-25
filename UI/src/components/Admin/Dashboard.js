import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { CommonContext } from "../../App";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import card_bg from "../../Assets/Images/card_bg.svg";
import Modal from "react-bootstrap/Modal";
import deleteicon from "../../Assets/Images/Delete_icon (1).svg";
import editicon from "../../Assets/Images/edit_icon (1).svg";

// import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tableshow, setTableShow] = useState(false);
  // const [updatedid ,setupdatedid]= useState()
  const handleCloseEdit = () => setShowEdit(false);
  //modal for edit
  const [showedit, setShowEdit] = useState(false);
  // const handleCloseEdit = () => setShowEdit(false);
  const [value, setValue] = useState({ id: "", value: "" });

  let [inputValues, setInputValues] = useState({
    issue_type: "",
  });
  let [issue_type, setIssuetype] = useState("");

  let [data, setData] = useState([]);
  let [stage, setStage] = useState("");

  const [issuedata, setissuedata] = useState([]);
  let [issuestage, setissuestage] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(`${commonContext.apiurl}/issue-types/`, {
      issue_type,
    });
    if (res.data.statusCode === 200) {
      toast.success("Issue Create Successfylly!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTableShow(true);
      setShow(false);
    } else {
      // console.error("internal serval issy");
      toast.error("Internal Server Error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  let handleDelete = async (id) => {
    let res = await axios.delete(`${commonContext.apiurl}/issue-types/${id}`);
    if (res.data.statusCode === 200) {
      issuestage1();
      toast.error("issue type  Deleted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // loadData();
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const issueedit = async (e) => {
    e.preventDefault();

    let res = await axios.put(
      `${commonContext.apiurl}/issue-types/${value.id}`,
      {
        issue_type,
      }
    );
    if (res.data.statusCode === 200) {
      toast.success("Issue Edited Successfylly!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setValue(value);
      issuestage1();
      // setupdatedid();
      setShowEdit(false);
      setTableShow(true);
      setShow(false);
    } else {
      toast.error("Invalid Issue  ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    return;
  };

  const gotoProfile = () => {
    navigate("/admin-profile/");
  };

  const handleOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };
  let [count, setCount] = useState({ open: 0, inProgrogres: 0, clossed: 0 });
  let commonContext = useContext(CommonContext);

  let navigate = useNavigate();

  let loadCount = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues-count`);
    if (res.data.statusCode === 200) setCount(res.data);
  };

  useEffect(() => {
    loadCount();
    issuestage1();
  }, []);

  let loadStage = async (stage) => {
    let res = await axios.get(
      `${commonContext.apiurl}/issues-by-status/${stage}`
    );
    console.log(res.data);
    if (res.data.statusCode === 200) {
      setStage(stage);
      setData(res.data.issues);
    }
  };

  let issuestage1 = async (issuestage) => {
    let res = await axios.get(`${commonContext.apiurl}/issue-types`);
    if (res.data.statusCode === 200) {
      let arr = res.data.issues_types;
      setissuedata(arr);
      setissuestage(issuestage);
      // setissuedata(res.issuedata.issues);
    }
  };
  return (
    <div>
      <div className="container-fluid DisplayFlex SpaceBetween AlignCenter Dashheader">
        <div className="fs32 textteal fw600 ">LOGO</div>

        <div className="DisplayFlex AlignCenter">
          <div className="dropdown">
            <button
              className="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#" onClick={gotoProfile}>
                  AdminProfile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Change Password
                </a>
              </li>
              {/* <li><a className="dropdown-item" href="#"></a></li> */}
            </ul>
          </div>
          <button
            className="DisplayFlex AlignCenter logoutbtn"
            onClick={handleOut}
          >
            <div>Logout</div>
            <div className="">
              <i className="fa fa-sign-out ms-3 fs24" aria-hidden="true"></i>
            </div>
          </button>
        </div>
      </div>

      <div className="DisplayFlex">
        <div className="sidewrapper ">
          <div>
            <div>
              <button className="DisplayFlex AlignCenter">
                <div>
                  <i className="fa fa-dashboard me-3"></i>
                </div>
                <div>Dashboard</div>
              </button>
            </div>
            <div>
              <button className="DisplayFlex AlignCenter">
                <div>
                  <i className="fa fa-plus me-3" aria-hidden="true"></i>
                </div>
                <div>
                  {/* <a href="/addissuetype">Add Issue Type</a>
                   */}
                  <div className="" onClick={handleShow}>
                    Add IssueType
                  </div>
                </div>
              </button>
            </div>

            <div>
              <button className="DisplayFlex AlignCenter">
                <div>
                  <i className="fa fa-search me-3" aria-hidden="true"></i>
                </div>

                <div>
                  <a href="/track-issue">Track Status</a>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="Adminwrapper container-fluid">
          <div className="container">
            <div className="pageInfo">
              <div>{/* <h2 className="heading24_bold">Issue Type</h2> */}</div>
              <div></div>
            </div>
            <div className="main-wrapper m20">
              {tableshow ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Issue Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedata.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e._id}</td>

                          <td>{e.issue_type}</td>
                          <td>
                            <div className="DisplayFlex AlignCenter">
                              <div className="mr_12">
                                <button
                                  className="emptyButton"
                                  onClick={() => {
                                    setShowEdit(true);
                                    setValue({
                                      id: e._id,
                                      value: e.issue_type,
                                    });
                                  }}
                                >
                                  {/* edit */}
                                  <img src={editicon} alt="editicon" />
                                </button>
                              </div>
                              <div>
                                <button
                                  className="emptyButton"
                                  onClick={() => handleDelete(e._id)}
                                >
                                  {/* Delete */}

                                  <img src={deleteicon} alt="deleteicon" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div className="" src={card_bg} alt="">
                  <div className="DisplayFlex flexwrap ">
                    <div className="issue_card ">
                      <div>
                        <Card.Body onClick={() => loadStage("Open")}>
                          <Card.Title>Open Issues {count.open}</Card.Title>
                        </Card.Body>
                      </div>

                      {/* <div className="fs48 mt-1 "> 200</div> */}
                    </div>
                    <div className="issue_card">
                      <div>
                        <Card.Body onClick={() => loadStage("In-Progress")}>
                          <Card.Title>
                            In-Progress Issues {count.inProgrogres}
                          </Card.Title>
                        </Card.Body>
                      </div>
                      {/* <div className="fs48 mt-1">20</div> */}
                    </div>
                    <div className="issue_card ">
                      <div>
                        <Card.Body onClick={() => loadStage("Clossed")}>
                          <Card.Title>Closed Issues {count.clossed}</Card.Title>
                        </Card.Body>
                      </div>
                      {/* <div className="fs48 mt-1">500</div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="main-wrapper m20">
            {stage !== "" ? <h1>List of {stage} Issues</h1> : <></>}
            {data.length ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Issue Title</th>
                    <th>Issue Type</th>
                    <th>Created At</th>
                    <th>Name</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e, i) => {
                    return (
                      <tr
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/issue/${e.zen_id}`);
                        }}
                      >
                        <td>{e.zen_id}</td>
                        <td>{e.issueTitle}</td>
                        <td>{e.issueType}</td>
                        <td>{e.createdAt}</td>
                        <td>{e.name}</td>
                        <td>{e.mobile}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        /> */}
      </div>

      {/* add */}
      <Modal show={show} onHide={handleClose} className="addnewpopup">
        <form onSubmit={(e) => handleSubmit(e, "post")}>
          <Modal.Header>
            <div>
              <h4>Add New Product </h4>
            </div>
            <div>
              <button className="emptyBtn" onClick={handleClose}>
                {/* <img src={CloseIcon} /> */}
              </button>
            </div>
          </Modal.Header>
          <div className="modelScroll">
            <Modal.Body>
              <div className="row mb_16">
                {/* <div className="col-md-3">
                  <label className="grayUpperLabel">Add Issue type</label>
                </div> */}
                <div className="col-md-9">
                  <div className="mb_16">
                    <label className="inputTitle mb_8">Issue Type</label>
                    <input
                      type="text"
                      id="issue_type"
                      name="issue_type"
                      placeholder="Enter IssueType"
                      onChange={(e) => setIssuetype(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            <div>
              <button className="popupCancelButton" onClick={handleClose}>
                Cancel
              </button>
            </div>
            <div>
              <button
                className="popupMainButton"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      {/* edit */}
      <Modal show={showedit} onHide={handleClose} className="addnewpopup">
        <form onSubmit={(e) => issueedit(e)}>
          <Modal.Header>
            <div>
              <h4>Edit issue type </h4>
            </div>
            <div>
              <button className="emptyBtn" onClick={handleCloseEdit}>
                <img src={editicon} />
              </button>
            </div>
          </Modal.Header>
          <div className="modelScroll">
            <Modal.Body>
              <div className="row mb_16">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                  <div className="mb_16">
                    <label className="inputTitle mb_8" htmlFor="name">
                      Issue edit
                    </label>
                    <input
                      type="text"
                      id="issue_type"
                      name="issue_type"
                      placeholder="Enter IssueType"
                      defaultValue={value.value}
                      onChange={(e) => setIssuetype(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
          <Modal.Footer>
            <div>
              <button className="popupCancelButton" onClick={handleCloseEdit}>
                Cancel
              </button>
            </div>
            <div>
              <button
                className="popupMainButton"
                type="submit"
                // onClick={issueupdate}
              >
                Update
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
