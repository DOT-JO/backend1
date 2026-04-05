const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/test").then(()=>{
mongoose.connect(process.env.URL_DB).then(()=>{
  console.log("Ready to Use DB"); 
}).catch((err)=>{
console.log(err);
})