import React from "react";
import about_img from "../../Assets/Images/aboutus_img.svg";
import IT_icon from "../../Assets/Images/IT-ico.svg";
import Toilet_icon from "../../Assets/Images/toilet-ico.svg";
import mech_icon from "../../Assets/Images/wrench-hammer ico.svg";
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  const Signup1 = () => {
    navigate("/signup1");
  };
  const login1 = () => {
    navigate("/login1");
  };

  const Newissue1 = () => {
    navigate("/new-issues");
    console.log("trsers");
  };

  return (
    <div>
      <header>
        <nav className="navbar ms-4 me-4 navbar-expand-lg ">
          <div className="container-fluid  navcontent ">
            <div>
              {" "}
              <a className="navbar-brand fs32" href="#">
                LOGO
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  " id="navbarNav">
              <ul className="navbar-nav DisplayFlex AlignCenter">
                <li className="nav-item CursorPointer">Contact Us</li>
                <li className="pe-0">
                  <button className="navbtn" onClick={Newissue1}>
                    Submit a Request
                  </button>
                </li>
                <li className="pe-0">
                  <button className="navbtn" onClick={login1}>
                    Sign In
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="banner pt-5">
        <div className="container text-center pt-5 pb-5">
          <div className="fs32 fs28_mob fw600 text-white mt-5  line-1 anim-typewriter">
            Hi, How can we Help You ?
          </div>
          <div className="row JustifyCenter AlignCenter ">
            <div className="col-md-6 DisplayFlex AlignCenter">
              <input
                placeholder="Search here..."
                className="form-control searchblock"
                type="text"
              ></input>

              <div>
                <button className="searchbtn CursorPointer">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt80 pb80">
        <div className="row SpaceBetween AlignCenter">
          <div className="col-md-4">
            <img className="w_100" src={about_img}></img>
          </div>
          <div className="col-md-6">
            <div className="">
              <div className="headfont">
                About Us
                <div className="head_btm mb-5"></div>
              </div>
            </div>
            <div className="text_grey lh-lg">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </div>
            <div>
              <button className="signinbtn" onClick={Signup1}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt80 pb80">
        <div className="row ">
          <div className="col-md-12 FlexColumn DisplayFlex AlignCenter">
            <div className="headfont ">
              Our Services
              <div className="head_btm  mb-5"></div>
            </div>
          </div>
          <div className="row SpaceBetween mt-4">
            <div className="col-md-3 service_card text-center">
              <div>
                <img src={IT_icon}></img>
              </div>
              <div className="fs20 mt-2">IT Services</div>
            </div>
            <div className="col-md-3 service_card text-center ">
              <div>
                <img src={Toilet_icon}></img>
              </div>
              <div className="fs20 mt-2">HouseKeeping</div>
            </div>
            <div className="col-md-3 service_card text-center ">
              <div>
                <img src={mech_icon}></img>
              </div>
              <div className="fs20 mt-2">Maintenance</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt80 pb80">
        <div className="row JustifyCenter">
          <div className="col-md-12 FlexColumn DisplayFlex AlignCenter">
            <div className="headfont ">
              FAQs
              <div className="head_btm  mb-5"></div>
            </div>
          </div>

          <div className="col-md-10">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How to Login?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    How to Call for Maintenance?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Where I get my Coupons?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="pb80 pb80">
        <div className="container pt80 ">
          <div className="row SpaceBetween">
            <div className="col-md-3">
              <div className="fs32 fw600 textteal">LOGO</div>
              <div className="mt-4">
                It is a long established fact that a reader will be distracted
              </div>
            </div>
            <div className="col-md-3">
              <div className="fs20">Services</div>
              <div>
                <ul className="mt-4 footerhover">
                  <li>IT Services</li>
                  <li>HouseKeeping</li>
                  <li>Maintenance</li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="fs20">Contact</div>
              <div>
                <ul className="mt-4">
                  <li className="DisplayFlex AlignCenter">
                    <div>
                      <i className="fas fa-phone-alt me-2"></i>
                    </div>
                    <div>
                      <a href="tel:+910000000000" target="_blank">
                        +91 00 0000 0000
                      </a>
                    </div>
                  </li>

                  <li className="DisplayFlex AlignCenter">
                    <div>
                      <i className="fas fa-paper-plane me-2"></i>
                    </div>
                    <div>
                      <a href="mailto:example@gmail.com" target="_blank">
                        Example@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="DisplayFlex AlignCenter">
                    <div>
                      <i className="fas fa-map-pin me-2"></i>
                    </div>
                    <div>Workafella, Teynampet, Chennai.</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="final_footer">
        <div className="container text-center">©Copyrights Reserved 2022.</div>
      </div>
    </div>
  );
}

export default Home;
