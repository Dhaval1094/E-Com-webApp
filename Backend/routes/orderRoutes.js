const express = require("express");
const router = express.Router();
router.get("/orders", (req, res) => {
  console.log("GET /orders hit");
  res.json({
    message: "Orders route working"
  });
});
module.exports = router;