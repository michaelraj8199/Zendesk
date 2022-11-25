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

  let handleLoadTicket = async (id) => {
    console.log("tttt", params);
    let res = await axios.get(`${commonContext.apiurl}/issues/${params.id}`);
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
      `${commonContext.apiurl}/change-status/${params.id}`,
      {
        comments: comment,
      }
    );
    if (res.data.statusCode === 200) {
      toast.success("message send your mailid ", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // navigate("/feedback");
    } else {
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
      <div
        className=" DisplayFlex pb-80
       JustifyCenter AlignCenter formbody "
      >
        <div className=" container ">
          <div className="row  JustifyCenter ">
            <div className="loginblock col-md-4 bg-white rounded shadow">
              <div className="loginbg  mt-2 fs32 rounded">Issue Status</div>

              <div className="p-2">
                {data !== undefined ? (
                  <>
                    <div className="Issues_table">
                      <div>
                        <label>Issue Title :</label> {data.issueTitle}
                      </div>
                      <div>
                        <label>Issue Type :</label> {data.issueType}
                      </div>
                      <div>
                        <label>Issue Description :</label>{" "}
                        {data.issueDescription}
                      </div>
                      <div>
                        <label>Mobile :</label> {data.mobile}
                      </div>
                      <div>
                        <label>Status :</label>
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
                          <label>Created Date : </label>
                          {data.createdAt}
                        </div>
                        {data.status === "In-Progress" ? (
                          <div>
                            <label>Opend Date : </label>
                            {data.inProgressDate}
                          </div>
                        ) : (
                          <></>
                        )}
                        {data.status === "Clossed" ? (
                          <div>
                            <label>Closed Date : </label>
                            {data.closedDate}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="row AlignCenter">
                          <label className="col-md-3 ms-4 p-0">Comment:</label>
                          <div className="col-md-8">
                            <textarea
                              className="form-control "
                              type={"textArea"}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                        </div>
                        <br></br>
                      </div>
                      <div className="row JustifyCenter mt-2">
                        <div className="text-center col-md-4 pb-3">
                          <Button
                            className="searchbtn m-0"
                            onClick={() => {
                              navigate("/dashboard");
                            }}
                          >
                            Back
                          </Button>
                        </div>

                        {data.status === "Open" ? (
                          <div className="col-md-5">
                            <Button
                              className="signinbtn m-0"
                              onClick={() => {
                                nextStage();
                              }}
                            >
                              In-Progress
                            </Button>
                          </div>
                        ) : data.status === "In-Progress" ? (
                          <div className="col-md-3">
                            <Button
                              className="signinbtn m-0"
                              onClick={() => {
                                nextStage();
                                issuefeedback();
                              }}
                            >
                              Close
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Issues;
