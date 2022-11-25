import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Success() {
  let params = useParams();

  let [toggle, setToggle] = useState(false);

  let handleCopy = () => {
    setToggle(true);
    navigator.clipboard.writeText(params.id);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
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
              <div className="loginbg pb-3 mt-2 fs32 rounded">
                <div className="success-wrapper">
                  <CheckCircleOutlineIcon sx={{ fontSize: 100 }} />
                </div>
                Query raised Successfully
              </div>

              <div className="text-center pt-4 pb-3">
                <p className="fs24">
                  Your Ticket:
                  <div className="fw600 p-2">
                    {params.zen_id}
                    <span
                      onClick={() => handleCopy()}
                      className="copy CursorPointer "
                    ></span>
                  </div>
                </p>
                <Link to="/track-issue">
                  <Button className="searchbtn m-0">Check Your Status</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
