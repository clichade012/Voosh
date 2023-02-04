const express = require('express')

const router = express.Router()

const { createuser , login } = require('../controller/usercontroller')

const  {createorder,getorder}=require('../controller/ordercontroller')

const  {authenication ,authorisation} = require('../middleware/Auth')

// ---------------user APi----------------//
router.post('/url/add-user',createuser)

router.post('/url/login-user',login)

//-------------order API ----------//

router.post('/url/add-order',authenication ,authorisation ,createorder)

router.get('/url/get-order',authenication ,getorder)

router.all("/**", function (req, res) {
    res.status(400).send({
      status: false,
      msg: "The api you are requesting is not available",
    });
  });

module.exports = router;