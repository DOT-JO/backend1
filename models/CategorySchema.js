const {  default: mongoose } = require("mongoose");

const categorySchema =new  mongoose.Schema({
    name_ar:{type:String,required:true, unique:true},
    name_en:{type:String,required:true, unique:true},
    Department:{type:mongoose.Schema.Types.ObjectId,ref:"Department"}

    
},{timestamps:true}
)

module.exports=mongoose.model("category",categorySchema)


