const express = require("express");
const router = express.Router();

const { mongodb, dbName, dbUrl } = require("../config/dbConfig");

const { uploadFile, getS3 } = require("../CommonComponent/filehandler");
const { generate_qrCode } = require("../CommonComponent/qrcode");

const {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validateToken,
  adminGaurd,
  StoreAdminGaurd,
  ActiveAdmin,
} = require("../config/auth");
const { adminModel } = require("../config/dbScheema");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  try {
    let required_object = {
      // businessName: req.body.businessName,
      adminName: req.body.adminName,
      email: req.body.email,
      password: req.body.password,
    };

    let users = await adminModel.find({ adminName: req.body.adminName });
    if (users.length > 0) {
      res.send({
        statusCode: 400,
        message: "User Already Exists",
      });
    } else {
      let hashedPassword = await hashPassword(req.body.password);

      req.body.password = hashedPassword;
    }
    req.body.role = "StoreAdmin";

    let user = await adminModel.create(req.body);

    if (req?.files?.image != null && req?.files?.image != undefined) {
      let logo = await uploadFile(user.id, req.files?.image, "businesslogo", "");
    }

    await generate_qrCode(user.id, user.adminName);

    await res.send({
      statusCode: 200,
      message: "User Creation Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await adminModel.findOne({ email: req.body.email });
    if (user) {
      let validatePwd = await hashCompare(req.body.password, user.password);
      if (validatePwd) {
        let token = await createToken({
          email: user.email,
          password: user.password,
        });

        res.send({
          statusCode: 200,
          message: "Login Successful",
          // role: user.role,
          token,
          userId: user._id,
        });
      } else {
        res.send({
          statusCode: 401,
          message: "Incorrect Password",
        });
      }
    } else {
      res.send({
        statusCode: 400,
        message: "User Does Not Exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});
router.get(
  `/getadminprofile`,
  // validateToken,
  // StoreAdminGaurd,
  // ActiveAdmin,
  async (req, res) => {
    try {
      const adminId = req.headers.adminid;
      const adminprofile = await adminModel.findOne({
        _id: mongodb.ObjectId(adminId),
      });

      if (!adminprofile) {
        res.send({
          statusCode: 400,
          message: "Admin not found",
        });
      } else {
        const {
          adminName,
          email,
          mobile,
          businessLogo,
          altmobile,
          // businessName,
          active_flag,
          qrCodeImage,
          subscriptionType,
          _id,
        } = adminprofile;

        res.send({
          statusCode: 200,
          adminName: adminName,
          email: email,
          mobile: mobile,
          // businessName: businessName,
          active_flag: active_flag,
          QR_code: qrCodeImage
            ? `${process.env.API_URL}users/downloadimage/${_id}/qrcode`
            : null,
          businesslogo: businessLogo
            ? `${process.env.API_URL}users/downloadimage/${_id}/businessLogo`
            : null,
          subscriptionType: subscriptionType,
        });
      }
    } catch (error) {
      res.send({ statusCode: 500, message: "Internal server error" });
    }
  }
);

router.get("/downloadimage/:id/:image", async (req, res) => {
  try {
    const s3 = getS3();
    let urlKey = "";
    let result = await adminModel.find({
      _id: mongodb.ObjectId(req.params.id),
    });


    if (req.params.image == "qrcode") {
      urlKey = result[0].qrCodeImage;
    } else if(req.params.image=="businesslogo") {


      urlKey = result[0].businessLogo;
    }
    if (urlKey) {
      const bucketS3 = process.env.BUCKET_NAME;
      const params = {
        Bucket: bucketS3,
        Key: urlKey,
      };
      s3.getObject(params, function (err, data) {
        if (err) {
          console.log("Error...", err);
          // cannot get file, err = AWS error response,
          // return json to client
          return {
            success: false,
            error: err,
          };
        } else {
          //sets correct header (fixes your issue )
          //if all is fine, bucket and file exist, it will return file to client
          const stream = s3.getObject(params).createReadStream().pipe(res);
          console.log(stream);
          return stream;
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
      error: error,
    });
  }
});

router.get(`/getadminlogo`, ActiveAdmin, async (req, res) => {
  try {
    const adminId = req.headers.adminid;
    const adminprofile = await adminModel.findOne({
      _id: mongodb.ObjectId(adminId),
    });

    if (!adminprofile) {
      res.send({
        statusCode: 400,
        message: "Admin not found",
      });
    } else {
      const {
        adminName,
        email,
        mobile,
        businessLogo,
        altmobile,
        active_flag,
        qrCodeImage,
        subscriptionType,
        _id,
      } = adminprofile;

      res.send({
        statusCode: 200,
        adminName: adminName,
        email: email,
        mobile: mobile,
        altmobile: altmobile,
        // businessName: businessName,
        active_flag: active_flag,
        QR_code: qrCodeImage
          ? `${process.env.API_URL}users/downloadimage/${_id}/qrcode`
          : null,
        businesslogo: businessLogo
          ? `${process.env.API_URL}users/downloadimage/${_id}/businessLogo`
          : null,
        subscriptionType: subscriptionType,
      });
    }
  } catch (error) {
    res.send({ statusCode: 500, message: "Internal server error" });
  }
});

router.get("/downloadProductImage/:id", async (req, res) => {
  try {
    const s3 = getS3();
    let result = await foodModel.find({ _id: mongodb.ObjectId(req.params.id) });
    console.log(result);

    if (result) {
      const bucketS3 = process.env.BUCKET_NAME;
      const params = {
        Bucket: bucketS3,
        Key: result[0].image,
      };
      s3.getObject(params, function (err, data) {
        if (err) {
          // cannot get file, err = AWS error response,
          // return json to client
          return {
            success: false,
            error: err,
          };
        } else {
          //sets correct header (fixes your issue )
          //if all is fine, bucket and file exist, it will return file to client
          const stream = s3.getObject(params).createReadStream().pipe(res);
          console.log(stream);
          return stream;
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal server error",
      error: error,
    });
  }
});

module.exports = router;
