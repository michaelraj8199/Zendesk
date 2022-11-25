require("dotenv").config();
const { mongodb } = require("../config/dbConfig");
// const { otpModel, adminModel, customersModel } = require("./dbSchema");

let accountSid = process.env.ACCOUNT_SID;
let authToken = process.env.AUTH_TOKEN;
let from_mobile = process.env.PRACTICE_PHONE;

const twilio = require("twilio")(accountSid, authToken);

const sendMessage = async (sms_data) => {
  const { body, to_mobile } = sms_data;
  twilio.messages
    .create({
      body: body,
      from: from_mobile,
      to: to_mobile,
    })
    .then((res) => {
      return { statusCode: 200, status: res.status };
    })
    .catch((err) => console.log(err));
};


module.exports = { sendMessage };
