import React from "react";
import axios from "axios";
import env from "../../enviroinment";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Field should contain a valid e-mail")
        .max(255)
        .required("E-mail is required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      let res = await axios.post(`${env.apiurl}/users/login`, values);
      if (res.data.statusCode === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.userId);
        toast.success("login Successfully ");
        navigate("/login");
        if (res.data) {
          navigate("/dashboard");
        } else {
          toast.error(res.data.message);
        }
      }
    },
  });
  const gotoRegister = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className=" DisplayFlex AlignCenter JustifyCenter formbody ">
        <div className=" container ">
          <div className="row  JustifyCenter m-2">
            <div className="loginblock col-md-4 bg-white rounded shadow">
              <div className="loginbg pb-2 mt-2 fs32 rounded">
                Log In
                <p className="mt-2">
                  We hear what you say! and Do what you Think!
                </p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="p-2 row JustifyCenter"
              >
                <div className="mb-3 mt-4 col-md-12">
                  <label for="text" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter Email Address"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="error_text">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="mb-4 col-md-12 input-container">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="error_text">{formik.errors.password}</p>
                  ) : null}
                  <div>
                    <a href="#" className="fs12 text_grey">
                      Forgot Password
                    </a>
                  </div>
                </div>
                <div className="fs12 text-center pt-2 pb-2">
                  <p className="fs12 ">
                    Do you want to Create a Business?
                    <a onClick={gotoRegister} className="">
                      Signup
                    </a>
                  </p>
                </div>

                <div className="text-center pt-4 pb-2">
                  <button className="searchbtn m-0">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
