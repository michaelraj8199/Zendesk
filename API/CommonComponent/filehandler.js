const AWS = require("aws-sdk");
require("dotenv").config();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const {
  mongoose,
  adminModel,
//   foodModel,
  orderModel,
  adminUsersModel,
//   paymentModel
} = require("../config/dbScheema");

const getS3 = () => {
  return new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
};

const uploadFile = async (adminId, file, imageType, productId) => {
  let response_filename;
  const s3 = getS3();
  const today = new Date();
  const dataString = `${today.getFullYear()}${
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1
  }${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`;

  if (imageType === "qrcode") {
    response_filename = `${process.env.CHILD_PATH}${adminId}/${dataString}_qrcode.png`;
    await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Key: response_filename,
        Body: file.buffer,
      })
      .promise();
    await adminModel.updateOne(
      { _id: mongodb.ObjectId(adminId) },
      {
        $set: {
          qrCodeImage: response_filename,
        },
      }
    );
  } else if (imageType === "businesslogo") {
    response_filename = `${process.env.CHILD_PATH}${adminId}/businesslogo/${dataString}-${file.name}`;
    await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Key: response_filename,
        Body: file.data,
      })
      .promise();
    await adminModel.updateOne(
      { _id: mongodb.ObjectId(adminId) },
      {
        $set: {
          businessLogo: response_filename,
        },
      }
    );
  } 

  return response_filename;
};

module.exports = { uploadFile, getS3 };
