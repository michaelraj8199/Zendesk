import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../enviroinment";
function Adminprofile() {
  const [data, setData] = useState([]);
  let token = sessionStorage.getItem("token");
  let userId = sessionStorage.getItem("userId");
  let loadData = async () => {
    let res = await axios.get(`${env.apiurl}/users/getadminprofile`, {
      headers: { Authorization: `Bearer ${token}`, adminid: userId },
    });
    if (res.data.statusCode === 200) {
      let arr = [];
      const {
        adminName,
        email,
        mobile,
        businesslogo,
        QR_code,
        active_flag,
        subscriptionType,
      } = res.data;
      let object = {
        adminName: adminName,
        email: email,
        mobile: mobile,
        businesslogo: businesslogo,
        QR_code: QR_code,
        active_flag: active_flag,
        subscriptionType: subscriptionType,
      };
      arr.push(object);

      setData(arr);
    }
  };
  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="formbody">
      <div className=""></div>
      <div className="container  ">
        <div className="row">
          <div className="col-md-12 fs32 textpurple fw600 p-3">
            Admin Profile
          </div>
        </div>
        <div className="col-md-12 adminblock shadow bg-white">
          <div className="row mt-3 ">
            {data?.map((business, index) => (
              <div key={index} className="row AlignCenter SpaceBetween  ">
                <div className="col-md-3 text-center">
                  <div className=" ">
                    <div className="  fs20 text_grey mb-2"> Business Logo</div>
                    {business.businesslogo}
                    <img
                      src={business.businesslogo ? business.businesslogo : null}
                      alt=""
                      width={"150px"}
                      height={"150px"}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <table className="mt-5 admin_table">
                    {/* <tr>
                    <th>Business Name</th>
                    <td> {business.businessName}</td>
                  </tr> */}
                    <tr>
                      <th>User Name: </th>
                      <td> {business.adminName}</td>
                    </tr>
                    <tr>
                      <th>Phone No:</th>
                      <td>{business.mobile}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{business.email}</td>
                    </tr>
                  </table>
                </div>
                <div className="col-md-3 text-center">
                  <div className="fs20 text_grey">QR-Code</div>
                  <div className=" qr_code container">
                    <img
                      src={business.QR_code ? business.QR_code : null}
                      alt=""
                      width={"150px"}
                      height={"150px"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminprofile;
