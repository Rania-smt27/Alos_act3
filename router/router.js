const express = require("express");
const router = express.Router();
// controller path
const controller = require("../controller/controller");
const { body, validationResult } = require('express-validator');


// signup routes
router.post("/signup",



controller.signup

)

// login routes
router.post("/login", controller.login);



// requiredtoken
function requiredtoken(req, res, next) {
  let headers = req.headers["token"];
  console.log(headers, "token##");
  if (typeof headers !== undefined && headers !== "") {
    req.token = headers;
    next();
    
  } else {
   return res.send({
      status: false,
      msg: "token required ...",
    });
  }
}
router.get("/home",requiredtoken, controller.home);

module.exports = router;
