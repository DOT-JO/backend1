const { default: mongoose } = require("mongoose")


const userSchema =new mongoose.Schema({

    email:{type:String ,required:true ,unique:true},

    password:{ type:String ,required :true},
    name:{type:String},
    items:[{type : mongoose.Schema.Types.ObjectId ,ref :"Item"}]

})


module.exports =mongoose.model("user",userSchema)