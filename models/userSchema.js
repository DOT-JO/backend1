const { default: mongoose } = require("mongoose")
const bcrypt =require("bcrypt")

const userSchema =new mongoose.Schema({

    email:{type:String ,required:true ,unique:true},

    password:{ type:String ,required :true},
    name:{type:String},
    items:[{type : mongoose.Schema.Types.ObjectId ,ref :"Item"}],
   role:{
    type:mongoose.Schema.Types.ObjectId,

    ref:"Role"
   }
})



userSchema.pre("save",async function(){                    //hash password
    this.password=await bcrypt.hash(this.password,10)
})



userSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password,this.password)
}



module.exports =mongoose.model("user",userSchema)