const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const secretKey = "fdsjJLkjKNKkjn.KJN";
const { adminModel } = require("../config/dbScheema");
const { mongodb } = require("../config/dbConfig");

let hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(saltRounds);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

let hashCompare = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

let createToken = async ({ email, role }) => {
  let token = await jwt.sign({ email, role }, secretKey, { expiresIn: "1h" });
  return token;
};

let decodeToken = async (token) => {
  let data = jwt.decode(token);
  return data;
};

//middleware - verify the token
let validateToken = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let data = await decodeToken(token);
    let date = Math.round(new Date() / 1000);
    if (date <= data.exp) {
      next();
    } else {
      res.send({
        statusCode: 400,
        message: "Token Expired",
      });
    }
  } else {
    res.send({
      statusCode: 400,
      message: "No token Found",
    });
  }
};

//middleware - verify the role Admin
let adminGaurd = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let data = await decodeToken(token);
    if (data.role === "admin") next();
    else
      res.send({
        statusCode: 401,
        message: "Unauthorised! Only Admin can access",
      });
  } else {
    res.send({
      statusCode: 400,
      message: "No token Found",
    });
  }
};

let StoreAdminGaurd = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let data = await decodeToken(token);
    if (data.role === "StoreAdmin") next();
    else
      res.send({
        statusCode: 401,
        message: "Unauthorised! Only Admin can access",
      });
  } else {
    res.send({
      statusCode: 400,
      message: "No token Found1",
    });
  }
};

const ActiveAdmin = async (req, res, next) => {
  let adminId = req?.headers?.adminid;
  if (adminId) {
    let active = await adminModel.findOne({
      _id: mongodb.ObjectId(adminId),
      active_flag: true,
    });
    console.log(active);
    if (active) next();
    else {
      res.send({
        statusCode: 400,
        message: "Contact Your Admin",
      });
    }
  } else {
    res.send({
      statusCode: 400,
      message: "AdminId not found",
    });
  }
};

module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validateToken,
  adminGaurd,
  StoreAdminGaurd,
  ActiveAdmin,
};
