var express = require("express");
var router = express.Router();
const { mongodb, dbName, dbUrl } = require("../config/dbConfig");
const { mongoose, issueModel, issueTypeModel } = require("../config/dbScheema");
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const { sendMessage } = require("../CommonComponent/twilio");

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected..!!!!"))
  .catch((err) => console.log(err));
//issuetype
router.get("/issue-types", async (req, res) => {
  try {
    let issues_types = await issueTypeModel.find();
    let issueTypes = [];

    issues_types.map((e) => {
      issueTypes.push(e.issue_type);
    });
    res.send({
      statusCode: 200,
      issueTypes,
      issues_types,
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

router.post("/issue-types", async (req, res) => {
  console.log("test", req);
  try {
    let issueType = await issueTypeModel.create(req.body);
    let issuestypes = [];

    res.send({
      statusCode: 200,
      message: "Issue Type Created Successfylly!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.put("/issue-types/:id", async (req, res) => {
  try {
    console.log("trstrstrstrstrstrs");
    let issueType = await issueTypeModel.findOne({
      _id: mongodb.ObjectId(req.params.id),
      // console.log()
    });
    console.log("test!!!!!!!!!!!!!!!!!!!!!!!!", issueType);
    let filter = {_id:  mongodb.ObjectId(req.params.id) }  
    let update = {issueType : req.body.issue_type} 

    if (issueType) {
      await issueTypeModel.updateOne(filter,update);

      // issueType.issue_type = req.body.issue_type;
      // await issueType.save();
      res.send({
        statusCode: 200,
        message: "Issue Edited Successfylly!",
      });
    } else {
      res.send({
        statusCode: 400,
        message: "Invalid Issue",
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

router.delete("/issue-types/:id", async (req, res) => {
  try {
    let issueType = await issueTypeModel.deleteOne({
      _id: mongodb.ObjectId(req.params.id),
    });
    res.send({
      statusCode: 200,
      message: "Issue Deleted Successfylly!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      // erorr,
    });
  }
});

router.get("/issues-count", async (req, res) => {
  try {
    let open = await issueModel.find({ status: "Open" }).count();
    let inProgrogres = await issueModel.find({ status: "In-Progress" }).count();
    let clossed = await issueModel.find({ status: "Clossed" }).count();

    res.send({
      statusCode: 200,
      open,
      inProgrogres,
      clossed,
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

router.get("/issues-by-status/:status", async (req, res) => {
  try {
    let issues = await issueModel.find({ status: `${req.params.status}` });
    res.send({
      statusCode: 200,
      issues,
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
///create issue api
router.get("/issues/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id---->", id);
    let issue = await issueModel.find({ id });
    res.send({
      statusCode: 200,
      issue,
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

const SendGridMail = async () => {
  console.log("tes1111=>>>>>>>>>>>>>>>>>");
  const body = "This is a test email using SendGrid from Node.js";
  const url = process.env.base_url;

  const options = {
    to: "mailtomichael1@gmail.com",
    from: "no_reply@atg.money",
    subject: "Test email with Node.js and SendGrid",
    html: `Issue has been moved to In-Progress.You will receive a message when issue gets closed`,
  };

  try {
    await sendGridMail.send(options);
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const SendGridMail1 = async () => {
  console.log("tes1111=>>>>>>>>>>>>>>>>>");
  const body = "This is a test email using SendGrid from Node.js";
  const url = process.env.base_url;

  const options = {
    to: "mailtomichael1@gmail.com",
    from: "no_reply@atg.money",
    subject: "Test email with Node.js and SendGrid",
    html: `Issue has been Closed!`,
  };

  try {
    await sendGridMail.send(options);
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

router.post("/issues", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, issueDescription, issueTitle, mobile, issueType } =
      req.body;
    let noissue = await issueModel.find({});
    let zen = "zen-";
    let idz = 10000 + noissue.length + 1;
    const zenid = zen + +idz;
    console.log(zenid, noissue.length);
    const issuecreated = new issueModel({
      zen_id: zenid,
      name: name,
      email: email,
      issueDescription: issueDescription,
      issueTitle: issueTitle,
      mobile: mobile,
      issueType: issueType,
    });
    await issuecreated.save();
    console.log("data------>", issuecreated);
    res.send({
      statusCode: 200,
      issue_id: issuecreated,
      message: "Issue Submitted Successfully!",
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

router.put("/change-status/:id", async (req, res) => {
  try {
    console.log(req.params);
    let issue = await issueModel.findOne({
      id: req.params.zen_id,
    });

    console.log("test1!!!!", issue);
    switch (issue.status) {
      case "Open":
        issue.status = "In-Progress";
        issue.comments = req.body.comments;
        issue.inProgressDate = new Date();
        const sms_body = {
          body: `Issue has been moved to In-Progress.You will receive a message when issue gets closed`,
          to_mobile: issue.mobile,
        };
        sendMessage(sms_body);
        SendGridMail();
        break;
      case "In-Progress":
        issue.status = "Clossed";
        issue.comments = req.body.comments;
        issue.closedDate = new Date();
        const sms_body2 = {
          body: "Issue has been Closed!",
          to_mobile: issue.mobile,
        };
        sendMessage(sms_body2);
        SendGridMail1();
        break;
      default:
        res.send({
          statusCode: 400,
          message: "Invalid Current Status",
        });
    }
    let result = await issue.save();
    res.send({
      statusCode: 200,
      message: "Status Changed Successfully",
      result,
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

module.exports = router;
