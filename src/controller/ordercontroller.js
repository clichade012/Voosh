const { isObjectIdOrHexString } = require('mongoose')
const ordermodel = require('../model/ordermodel')
const {isValid ,isvalidObjectId ,isValidNumber,isvalidPhone } = require('../validation/validator')

let createorder  = async function(req,res){
    try{
     let data = req.body
     let {user_Id ,sub_total ,phone_number} = data
     if (!user_Id) {
        return res.status(400).send({ status: false, message: "user_Id is required!" })
     }

     if (!isValid(user_Id)) {
        return res.status(400).send({ status: false, message: "user_Id is invalid!" })
     }

     if (!isvalidObjectId(user_Id)) {
        return res.status(400).send({ status: false, message: 'This user_Id have some missing character!' })
     }
     
     if (!sub_total) {
        return res.status(400).send({ status: false, message: "sub_total is required!" })
     }

     if (!isValid(sub_total)) {
        return res.status(400).send({ status: false, message: "sub_total is invalid!" })
     }

     if (!isValidNumber(sub_total)) {
        return res.status(400).send({ status: false, message: 'Please use valid number for sub_total!' })
     }
      
     if (!phone_number) {
        return res.status(400).send({ status: false, message: "phone_number is required!" })
     }

     if (!isValid(phone_number)) {
        return res.status(400).send({ status: false, message: "phone_number is invalid!" })
     }

     if (!isvalidPhone(phone_number)){
         return res.status(400).send({ status: false, message: "Mobile no. should be in indian correct format" })
     }

     let create = await ordermodel.create(data)

     return res.status(201).send({status:true , message:"Order create successfully",data:create})

    }catch(error){
        return res.status(500).send(error.message)
    }
}

const getorder = async function(req,res){
    try {
        let query = req.query
         
        let {user_Id} = query
        
        let filter ={}

        if(Object.keys(query).length == 0){
            let get = await ordermodel.find()
            if(!get){
                return res.status(404).send({status:false , message:"No data founded!"})
            }
            return res.status(200).send({status:true , message:"Succesfully got this document", data:get})
        }

        if (user_Id) {
            filter.user_Id = user_Id
        }

        let getbyquery = await ordermodel.find({isDeleted:false , ...filter})


        if(!getbyquery){
            return res.status(404).send({status:false , message:"No data founded!"})
        }

        return res.status(200).send({status:true , message:"Succesfully got this document", data:getbyquery})

        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {createorder,getorder}