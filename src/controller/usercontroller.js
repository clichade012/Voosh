
const usermodel = require('../model/usermodel')
const {isValid ,isValidName ,isvalidPhone ,isValidEmail ,isValidPassword} = require('../validation/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let createuser = async function(req,res){
    try {
      let data = req.body
      let { name ,mobile , email , password } = data
     
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: "Request Body should n't be empty" })
      }
      
    if (!isValid(name)) return res.status(400).send({ status: false, message: "name is invalid" })
    if (!name) return res.status(400).send({ status: false, message: "Name is required" })
    if (!isValidName(name)) return res.status(400).send({ status: false, message: "Name should be in A-Z" })

    if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Mobile is invalid" })
    if (!mobile) return res.status(400).send({ status: false, message: "Mobile is required" })
    if (!isvalidPhone(mobile)) return res.status(400).send({ status: false, message: "Mobile no. should be in correct format" })


    if (!isValid(email)) return res.status(400).send({ status: false, message: "Email is invalid" })
    if (!email) return res.status(400).send({ status: false, message: "Email is required" })
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Email should be in correct format" })
    let dupluicate = await usermodel.findOne({ email: email })
    if (dupluicate) {
      return res.status(409).send({ status: false, message: "this email already exists!" })
    }

    if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is invalid" })
    if (!password) return res.status(400).send({ status: false, message: "password is required" })
    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "password should be in correct format" })


    let secured = await bcrypt.hash(password, 10)
    data.password = secured

    let create = await usermodel.create(data)
    return res.status(201).send({ status: true, message: "Successfully created ", data: create })


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const login = async function (req, res) {
    try {
      let { mobile, password } = req.body
  
      if (!isValid(mobile)) return res.status(400).send({ status: false, message: "Mobile is invalid" })
      if (!mobile) return res.status(400).send({ status: false, message: "Mobile is required" })
      if (!isvalidPhone(mobile)) return res.status(400).send({ status: false, message: "Mobile no. should be in correct format" })
  
  
      const exist = await usermodel.findOne({ mobile: mobile })
      if (!exist) {
        return res.status(400).send({ status: false, message: "Invalid creditinal for Phone number" })
      }
  
      if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is invalid" })
      if (!password) return res.status(400).send({ status: false, message: "Password sholud be present!" })
      if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "Passowrd should be in correct format" })
  
      let secure = await bcrypt.compare(password, exist.password)
      if (!secure) {
        return res.status(400).send({ status: false, message: "Wrong Password!!" })
      }
  
      let token = jwt.sign({ userId: exist._id }, "Secretkeyforvoosh", { expiresIn: "24hr" })
  
  
      let decode = jwt.decode(token, "Secretkeyforvoosh")
  
      return res.status(200).send({ status: true, message: "Successfully Login", data: token, userId: decode.userId })
  
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {createuser,login}