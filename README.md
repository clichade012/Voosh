# Voosh

# mongodb
 "mongodb+srv://Chaitanya012:uEEYLDPlUa999wEK@cluster0.0zsen34.mongodb.net/Voosh-db?retryWrites=true&w=majority"

# Backend 
 ### userModel --
   name:{
        type:String,
        require:true
     },
     mobile:{
        type:Number,
        require:true
     },
     email:{
        type:String,
        require:true,
        unique:true
     },
     password:{
        type:String,
        require:true
     }

}

### orderModel--

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
    }


### user API's

router.post('/url/add-user',createuser)

router.post('/url/login-user',login)

## Order API's


router.post('/url/add-order',authenication ,authorisation ,createorder)

router.get('/url/get-order',authenication ,getorder)

--------------------------------------------------------------

To create this APi , I have used various package and framework such as:-
Bycrpt--To convert Password into Encrypt.
Jsonwebtoken- To create token and authenication purpose.
mongoose- To connect node.js and mongodb.
Express - used to build various Api's

--------------------------------------

# Front-end

use React to build UI 



---------------------------------------------------------------------------------------------------------------------------------------------------

