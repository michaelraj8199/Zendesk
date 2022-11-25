import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CommonContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ZenForm() {
  let commonContext = useContext(CommonContext);
  let [issueTypes, setIssueTypes] = useState([]);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [issueType, setIssueType] = useState("");
  let [issueTitle, setIssueTitle] = useState("");
  let [issueDescription, setIssueDescription] = useState("");

  let navigate = useNavigate();

  let loadIssueTypes = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issue-types`);
    if (res.data.statusCode === 200) {
      setIssueTypes(res.data.issueTypes);
      // toast.success("get data ");
    } else {
      // toast.error("data error");
    }
  };

  useEffect(() => {
    loadIssueTypes();
  }, []);

  let handleSubmit = async () => {
    let res = await axios.post(`${commonContext.apiurl}/issues`, {
      name,
      email,
      mobile,
      issueType,
      issueTitle,
      issueDescription,
    });
    if (res.data.statusCode === 200) {
      toast.success(" issue create Successfully!!!!");
      // navigate("/home");
      navigate(`/success/${res.data.issue_id.zen_id}`);
    } else {
      toast.error("Please Fill Required Details ");
    }
  };
  return (
    <>
      <div className="wrapper-title">
        <div className="container-fluid loginbg fs32">
          Zendesk
          <p className="mt-2">We hear what you say! and Do what you Think!</p>
        </div>
      </div>
      <div className="wrapper-main mt-3">
        <Form className="container-fluid mt-5 row">
          <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
            <Form.Label>
              Name<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
            <Form.Label>
              Email address<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
            <Form.Label>
              Mobile<sup>*</sup>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Your Mobile"
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
            <Form.Label>Issue Type</Form.Label>
            <Form.Select
              // value={null}
              onChange={(e) => {
                setIssueType(e.target.value);
              }}
            >
              {issueTypes.map((e, i) => {
                return (
                  <option value={e} key={i}>
                    {e}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 col-md-4" controlId="formBasicPassword">
            <Form.Label>Issue Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-md-4" label="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Leave a comment here"
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </Form.Group>

          <div className="text-center mt-5">
            <Button
              className="searchbtn pe-5 ps-5 m-0"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
}

export default ZenForm;
