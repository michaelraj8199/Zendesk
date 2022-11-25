import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../enviroinment";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const navigate = useNavigate();
  let [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState({});
  let [input, setInput] = useState({
    adminName: "",
    businessName: "",
    businessLogo: "",
    email: "",
    mobile: "",
    password: "",
    altmobile: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const input_name = e.target.name;
    const input_value = e.target.value;
    setInput({ ...input, [input_name]: input_value });
  };
  const handleFile = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      adminName,
      businessName,
      businessLogo,
      email,
      mobile,
      password,
      altmobile,
    } = input;
    let formData = new FormData();
    formData.append("adminName", adminName);
    formData.append("businessName", businessName);
    formData.append("businessLogo", businessLogo);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("altmobile", altmobile);
    if (file) formData.append("image", file);
    let res = await axios.post(`${env.apiurl}/users/signup`, input);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("userId", res.data.user._id);
      toast.success("Account Successfully Created");
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  };
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  const handleRemove = (e) => {
    e.preventDefault();
    setFile(undefined);
    return;
  };

  const gotoLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="container-fluid loginbg fs32">
        Zendesk
        <p className="mt-2">Create Your Own Account</p>
      </div>

      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="container-fluid mt-5"
        >
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className=" form-label">Name</label>
              <input
              required
                type="text"
                id="adminName"
                name="adminName"
                placeholder="Enter Your Name"
                className="form-control"
                // className="MainInput"
                onChange={handleChange}
                maxLength={15}
              />
            </div>


            <div className=" mb-3 col-md-6">
              <label className="form-label">Email address</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email Address"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label ">Phone No</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                placeholder="Phone No"
                className="form-control"
                onChange={handleChange}
                maxLength={10}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label ">Alternative No</label>
              <input
                type="number"
                id="altmobile"
                name="altmobile"
                placeholder="Phone No"
                className="form-control"
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            <div className="col-md-6  mb-3">
              <label className=" form-label  ">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className=" form-label  ">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                className=" form-control"
              />
            </div>

            <div className="col-md-6 mt-4 mb-2 ">
              <div>
                <label className=" form-label">Upload Business Logo</label>
                <div className="">
                  <label htmlFor="businessLogo" className="">
                    {/* <img className="mr_12" src={UploadIcon} /> */}
                    <span>
                      <i
                        className="fa fa-upload text_grey me-2"
                        aria-hidden="true"
                      ></i>
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      name="businessLogo"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      id="businessLogo"
                      onChange={handleFile}
                      hidden
                    />
                  </label>
                </div>
              </div>
              {file ? (
                <div>
                  <div className=" DisplayFlex AlignCenter">
                    <div className="">
                      <img
                        cl
                        src={preview}
                        alt="image"
                        className="w_100px mt-3"
                      />
                    </div>
                    <a className="" onClick={handleRemove}>
                      <i
                        className="fa fa-window-close ms-3 text-danger"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="text-center mt-5">
              <button className="searchbtn m-0" type="submit">
                Signup
              </button>
            </div>


          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
