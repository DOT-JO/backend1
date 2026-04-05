const { default: mongoose } = require("mongoose");

const departmentSchema =new mongoose.Schema({
    departmentName_ar:{type:String,required:true, unique:true},
    departmentName_en:{type:String,required:true, unique:true},


},{
    timestamps:true
})
module.exports=mongoose.model("Department",departmentSchema)