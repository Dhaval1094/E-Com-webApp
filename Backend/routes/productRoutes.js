const express = require("express");
const AWS = require("aws-sdk");

const router = express.Router();

AWS.config.update({
  region: "ap-south-1"
});

const db =
  new AWS.DynamoDB.DocumentClient();

const TABLE = "Products";

router.get("/products", async (req, res) => {

  try {

    console.log("GET /products hit");

    const params = {
      TableName: TABLE
    };

    const data =
      await db.scan(params).promise();

    console.log(
      "DynamoDB response:",
      data
    );

    res.json(data.Items);

  } catch (error) {

    console.error(
      "Products route error:",
      error
    );

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;