const express=require("express")
const app=express();
const PORT=4001;
const cors = require("cors");
app.use(cors("*"));
const fileUpload= require("express-fileupload");
const path=require("path");
const connectdb=require('./config/connectdb')
require('./models/index')
const router=require('./router/userRouter')
app.use("/images", express.static(path.join(__dirname, "public/images")));
 app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
connectdb.connectdb();
app.use('/api',router)
app.get('/',(req,res)=>
{
    res.send("SERVER CREATED!")
});
app.listen(PORT,()=>
{
   console.log(`Server running at http://localhost:${PORT}/`);
})