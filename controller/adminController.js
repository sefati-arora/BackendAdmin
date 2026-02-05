require("dotenv").config();
const Models=require('../models/index');
const Joi=require("joi");
const jwt=require("jsonwebtoken")
const commonHelper=require('../helper/commonHelper');
const helper=require('../helper/validation');
const argon2=require("argon2");
const otpManager = require("node-twillo-otp-manager")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_SERVICE_SID
);
module.exports=
{
      adminLogin: async (req, res) => {
    try {
        console.log(req.body)
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      const payload = await helper.validationJoi(req.body, schema);
      const{password}=payload;
      const hash=await argon2.hash(password)
       const otp = Math.floor(1000 + Math.random() * 9000);

      const admin = await Models.userModel.create({ email:payload.email,password:hash,otp,otpVerify:1});
      //......UPDATE ROLE..............
      await Models.userModel.update({ role: 2,deviceToken:1}, { where: { id: admin.id } });
      const adminUpdate = await Models.userModel.findOne({
        where: { id: admin.id },
      });

      console.log("Email being sent to:", payload.email);
      //OTP SEND..................
        const otpSend= await commonHelper.otpSendLinkHTML(req, payload.email, otp);
        console.log(`OTP sent (${payload.email}): ${otp}`);
        console.log(otpSend)

        //TOKEN CREATION...................
      const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY);
       console.log(token)
      return res
        .status(200)
        .json({ message: "ADMIN LOGIN!", adminUpdate, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", error });
    }
  },
 otpVerify: async (req, res) => {
  try {
    const{email}=req.params;
    const {otp } = req.body;
    if (!otp ) {
      return res.status(400).json({ message: " OTP required!" });
    }
    const user = await Models.userModel.findOne({
      where: { email }
    });
  console.log("<<<<<",user)
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log(">>",user.otp)
    if (user.otp != otp) {
      return res.status(401).json({ message: "INVALID OTP" });
    }
    await Models.userModel.update(
      { otpVerify: 2, otp: null },
      { where: { email } }
    );
    return res.status(200).json({
      message: "OTP VERIFIED SUCCESSFULLY!"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", error });
  }
},
logOut:async(req,res)=>
{
  try
  {
  
    const id =req.user.id;
      console.log(">>>",id)
    const admin=await Models.userModel.findOne({where:{id}})
    if(!admin)
    {
      return res.status(404).json({message:"ADMIN NOT FOUND!"})
    }
    await Models.userModel.update({deviceToken:null},{where:{id}})
    const update=await Models.userModel.findOne({where:{id}})
    return res.status(200).json({message:"ADMIN LOGOUT SUCCESSFULLY!",update})
  }
  catch(error)
  {
    console.log(error)
    return res.status(500).json({message:"ERROR!",error})
  }
}
}
