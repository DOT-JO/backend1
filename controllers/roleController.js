const Role =require("../models/Role")



const createRole =async(req,res)=>{

    try {

        const {name,permissions} =req.body

       if(!name ||!permissions){
        return res.status(400).json({
            messsage:"name and permissions is required"
        })
       }

       const role =await Role.create({
        name,
        permissions


       })

       res.status(201).json({
        message:"new role was created",
        data:role
       })


        
    } catch (error) {
          res.status(500).json({
            message:"server Error",
            error:error.message
        })
    }



}

module.exports={
    createRole

}