const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderschema = new mongoose.Schema({
     user_Id:{
        type:ObjectId,
        ref:'user'
     } ,
    
     sub_total:{
        type: Number,
        required: true
     },
     phone_number:{
        type:Number,
        required:true
     },
    isDeleted: {
        type: Boolean,
        default: false
    },


},{timestamps:true})


module.exports = mongoose.model('order',orderschema)