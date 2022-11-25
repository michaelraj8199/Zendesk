// import React from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import env from "../enviroinment";
function Feedback() {
  const formik = useFormik({
    initialValues: {
      excellent: "",
      good: "",
      Mediocre: "",
      Bad: "",
      verybad: "",
    },
    validationSchema: Yup.object({
      // email: Yup.string()
      //   .email("Field should contain a valid e-mail")
      //   .max(255)
      //   .required("E-mail is required"),
      // password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      let res = await axios.post(`${env.apiurl}/users/feedback`, values);
      if (res.data.statusCode === 200) {
        if (res.data) {
          // navigate("/dashboard");
        } else {
          // toast.error(res.data.message);
        }
      }
    },
  });

  return (
    <div
      className=" DisplayFlex pb-80
        JustifyCenter AlignCenter formbody "
    >
      <div className=" container ">
        <div className="row  JustifyCenter ">
          <div className="loginblock col-md-4 bg-white rounded shadow">
            <div className="feedbackbg pb-2 mt-2 fs32 rounded">
              Feedback
              <p className="mt-2 ">Your Opinion Matters!!</p>
            </div>
            <form onSubmit={formik.handleSubmit} className="p-4 row ">
              <div className="text-center fs20 fw600 mb-3">
                Give us Your Feedback:
              </div>
              <div className="form-check col-md-12">
                <input
                  className="form-check-input"
                  type="radio"
                  // name="flexRadioDefault"
                  id="excellent"
                  name="excellent"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.excellent && formik.errors.excellent ? (
                  <p className="error_text">{formik.errors.excellent}</p>
                ) : null}
                <label className="form-check-label" for="flexRadioDefault1">
                  Excellent
                </label>
              </div>
              <div className="form-check col-md-12">
                <input
                  className="form-check-input"
                  type="radio"
                  id="good"
                  name="good"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.good}
                />
                {formik.touched.good && formik.errors.good ? (
                  <p className="error_text">{formik.errors.good}</p>
                ) : null}
                <label className="form-check-label" for="flexRadioDefault1">
                  Good
                </label>
              </div>
              <div className="form-check col-md-12">
                <input
                  className="form-check-input"
                  type="radio"
                  id="Mediocre"
                  name="Mediocre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Mediocre}
                />
                {formik.touched.Mediocre && formik.errors.Mediocre ? (
                  <p className="error_text">{formik.errors.Mediocre}</p>
                ) : null}
                <label className="form-check-label" for="flexRadioDefault1">
                  Mediocre
                </label>
              </div>
              <div className="form-check col-md-12">
                <input
                  className="form-check-input"
                  type="radio"
                  id="Bad"
                  name="Bad"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Bad}
                />
                {formik.touched.Bad && formik.errors.Bad ? (
                  <p className="error_text">{formik.errors.Bad}</p>
                ) : null}
                <label className="form-check-label" for="flexRadioDefault1">
                  Bad
                </label>
              </div>
              <div className="form-check col-md-12">
                <input
                  className="form-check-input"
                  type="radio"
                  id="verybad"
                  name="verybad"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verybad}
                />
                {formik.touched.verybad && formik.errors.verybad ? (
                  <p className="error_text">{formik.errors.verybad}</p>
                ) : null}
                <label className="form-check-label" for="flexRadioDefault1">
                  Very Bad
                </label>
              </div>

              <div className=" mt-4 col-md-12 text-center">
                <label className="form-label  fs20 fw600">
                  What could we Improve?
                </label>
                <textarea
                  className="form-control"
                  placeholder="Comment here..."
                  id="comment"
                  name="comment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                ></textarea>
                {formik.touched.comment && formik.errors.comment ? (
                  <p className="error_text">{formik.errors.comment}</p>
                ) : null}
              </div>

              <div className="text-center pt-4 pb-2">
                <button className="searchbtn m-0">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
