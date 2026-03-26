const User =require("../models/userSchema")

const  authorize=(permisstion)=>{
return  async (req,res,next) =>{
try {
  

    const user =await User.findById(req.user.id).populate("role")   //populate replace the ID with the fill role documnet ...git the details of role permesstions
console.log("user",user)

if(!user){
   return res.status(404).json({
        message:"user not found"
    })
}

    const matching = user.role.permissions.includes(permisstion)

console.log("matching",matching)

if(!matching){
    return res.status(403).json({
        message:"not authorized / access denied"
    })
}

next()

} catch (error) {

    res.status(500).json({
        message:"server error",
        error:error.message
    })
    
}

}
}


module.exports=authorize