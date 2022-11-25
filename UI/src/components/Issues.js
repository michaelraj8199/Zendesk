import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CommonContext } from "../App";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Issues() {
  let commonContext = useContext(CommonContext);
  let params = useParams();
  let [data, setData] = useState(undefined);
  let [comment, setComment] = useState("");
  let navigate = useNavigate();

  let handleLoadTicket = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues/${params.zen_id}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
      setComment(res.data.issue[0].comments);
    }
  };

  useEffect(() => {
    handleLoadTicket();
  }, []);

  let nextStage = async (stage) => {
    let res = await axios.put(
      `${commonContext.apiurl}/change-status/${params.zen_id}`,
      {
        comments: comment,
      }
    );
    if (res.data.statusCode === 200) {
      toast.success("message send your mailid ", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // navigate("/feedback");
    }else{
      toast.error("Error  mailid ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  const issuefeedback = () => {
    navigate("/feedback");
  };
  return (
    <>
      <div className="col-5 mx-auto">
        {data !== undefined ? (
          <>
            <div style={{ textAlign: "left", paddingTop: "20px" }}>
              <h2 style={{ textAlign: "center" }}>Welcome to Zen Desk!</h2>
              <h5>
                <strong>Issue Title :</strong> {data.issueTitle}
              </h5>
              <div>
                <strong>Issue Type :</strong> {data.issueType}
              </div>
              <div>
                <strong>Issue Description :</strong> {data.issueDescription}
              </div>
              <div>
                <strong>Mobile :</strong> {data.mobile}
              </div>
              <div>
                <strong>Status :</strong>
                <span
                  style={
                    data.status === "Open"
                      ? { color: "red" }
                      : data.status === "In-Progress"
                      ? { color: "#d4d435" }
                      : { color: "green" }
                  }
                >
                  {data.status}
                </span>
                <div>
                  <strong>Created Date : </strong>
                  {data.createdAt}
                </div>
                {data.status === "In-Progress" ? (
                  <div>
                    <strong>Opend Date : </strong>
                    {data.inProgressDate}
                  </div>
                ) : (
                  <></>
                )}
                {data.status === "Clossed" ? (
                  <div>
                    <strong>Closed Date : </strong>
                    {data.closedDate}
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <strong>Comment :</strong>
                  <input
                    type={"textArea"}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <br></br>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Go Back to Dashboard
              </Button>
              &nbsp;
              {data.status === "Open" ? (
                <Button
                  variant="warning"
                  onClick={() => {
                    nextStage();
                  }}
                >
                  In-Progress
                </Button>
              ) : data.status === "In-Progress" ? (
                <Button
                  variant="success"
                  onClick={() => {
                    nextStage();
                    issuefeedback();

                  }}
                >
                  Close
                </Button>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      <ToastContainer />

      </div>
    </>
  );
}

export default Issues;
