const mongoose = require("mongoose");
const validator = require("validator");

const issueScheema = new mongoose.Schema({
  zen_id: { type: "string", required: true },
  name: { type: "string", required: true },
  email: {
    type: "string",
    required: true,
    lowercase: true,
   
  },
  mobile: { type: "string", required: true },
  issueType: { type: "string", required: true },
  issueTitle: { type: "string", required: true },
  issueDescription: { type: "string", required: true },
  createdAt: { type: Date, default: Date.now() },
  inProgressDate: { type: Date, default: null },
  closedDate: { type: Date, default: null },
  status: { type: "string", default: "Open" },
  comments: {
    type: "string",
    default: "This issue will be addressed shortly!",
  },
});

const userSchema = new mongoose.Schema({
  // businessName: { type: String, required: true },
  mobile: { type: String, required: true },
  adminName: { type: String, required: true },
  email: {
    type: "string",
    required: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  businessLogo: { type: String, default: null },
  password: { type: "string", required: true },
  role: { type: "string", required: true },
  // active_flag: { type: Boolean, default: true },
  qrCodeImage: { type: String, default: null },
  subscriptionType: { type: String, default: "free" },
  createdAt: { type: Date, default: new Date() },
});

const issueTypeScheema = new mongoose.Schema({
  issue_type: { type: "string", required: true },
});

let issueModel = mongoose.model("issues", issueScheema);
let adminModel = mongoose.model("admins", userSchema);

let issueTypeModel = mongoose.model("issue-types", issueTypeScheema);

module.exports = { mongoose, adminModel, issueModel, issueTypeModel };
