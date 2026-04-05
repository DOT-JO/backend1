const Department =require("../models/departmentSchema")




const createDepartment= async(req,res)=>{
     try {
            const{departmentName_ar , departmentName_en}=req.body;
            if(!departmentName_ar||!departmentName_en){
                return res.status(400).json({
                  message:"name in arabic and name in english are both required"
    
                })
            }
    
            const exitDep= await Department.findOne({departmentName_ar})
    
              if(exitDep){
                return res.status(409).json({
                    message:"this department already exists"
                })
            }
    
            const newDep= await Department.create({
               departmentName_ar,
             departmentName_en
    
            })
    
            res.status(201).json({
                message:"new department was created",
                data:newDep
            })
            
        } catch (error) {
            res.status(500).json({
                message:"server error",
                error:error.message
    
            })
        }

}






const getAllIDep = async (req, res) => {

    try {
     

        const departments = await Department.find()

        console.log("cat",departments)
       
        res.status(200).json({
            message: "All catergories was fetching",
            data: departments
        })




    } catch (err) {
        res.status(500).json({
            message: "server error"
        })

    }



}






module.exports={
    createDepartment,
    getAllIDep

}