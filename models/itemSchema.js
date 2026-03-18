const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, required:true, unique:true},
    image:{type:String},
    category:{type:String , required:true ,
        enum:["elect","clothing","healthy"]},
        isDeleted :{type:Boolean , default :false}
    


},
{timestamps:true
})




module.exports = mongoose.model("Item", itemSchema)