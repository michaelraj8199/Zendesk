import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { CommonContext } from "../App";

function Status() {
  let commonContext = useContext(CommonContext);
  let [data, setData] = useState(undefined);
  let [ticket, setTicket] = useState("");

  let handleLoadTicket = async () => {
    let res = await axios.get(`${commonContext.apiurl}/issues/${ticket}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
    }
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
              <div className="loginbg pb-2 mt-2 fs32 rounded">
                Request Tracking
                <p className="mt-2">Track Your Request Status</p>
              </div>
              <Form className="p-2 row ">
                <div className="mb-3 mt-4 col-md-12">
                  <Form.Label for="text" className="form-label">
                    Ticket Number<sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter Ticket Number"
                    className="form-control"
                    id="text"
                    type="text"
                    onChange={(e) => setTicket(e.target.value)}
                  />
                </div>

                {data !== undefined ? (
                  <>
                    <div className="col-md-12">
                      <div className="text-center fw600 fs32">Status</div>
                      <div className="p-1">
                        <strong>Issue Title :</strong> {data.issueTitle}
                      </div>
                      <div className="p-1">
                        <strong>Issue Type :</strong> {data.issueType}
                      </div>
                      <div className="p-1">
                        <strong>Issue Description :</strong>{" "}
                        {data.issueDescription}
                      </div>
                      <div>
                        <div className="p-1">
                          <strong>Status : </strong>
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
                        </div>
                        <div className="p-1">
                          <strong>Created Date : </strong>
                          {data.createdAt}
                        </div>
                        {data.status === "In-Progress" ||
                        data.status === "Clossed" ? (
                          <div className="p-1">
                            <strong>Opend Date : </strong>
                            {data.inProgressDate}
                          </div>
                        ) : (
                          <></>
                        )}
                        {data.status === "Clossed" ? (
                          <div className="p-1">
                            <strong>Closed Date : </strong>
                            {data.closedDate}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="p-1">
                          <strong>Comment :</strong> {data.comments}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Form>
              <div className="text-center pt-4 pb-3">
                <Button
                  className="searchbtn m-0"
                  onClick={() => handleLoadTicket()}
                >
                  Check Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Status;
