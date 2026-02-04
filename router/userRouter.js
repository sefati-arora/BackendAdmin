const express=require("express");
const adminController=require('../controller/adminController')
const{authentication}=require('../middleware/authentication')
const router=express.Router();
router.post('/adminLogin',adminController.adminLogin)
router.post('/otpVerify/:email',authentication,adminController.otpVerify)
module.exports=router