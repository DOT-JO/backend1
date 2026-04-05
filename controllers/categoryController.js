
const { Mongoose, default: mongoose } = require("mongoose");
const Category=require("../models/CategorySchema")
const Depart=require("../models/departmentSchema")
mongoose


const createCategory =async(req,res)=>{
    try {
        const{name_ar,name_en,Department}=req.body;
        if(!name_ar||!name_en||!Department){
            return res.status(400).json({
              message:"name in arabic ,name in english and Department are both required"

            })
        }

        const exitCat=await Category.findOne({name_ar})

          if(exitCat){
            return res.status(409).json({
                message:"this category already exists"
            })
        }


        const departmentDetails= await Depart.findOne({departmentName_ar:Department})

        console.log("departmentDetails", departmentDetails)

        if(!departmentDetails){
            return res.status(404).json({
                message:"department not found"
            })
        }



        const newCat= await Category.create({
            name_ar,
            name_en,
            Department:departmentDetails._id

        })

        res.status(201).json({
            message:"new cat was created",
            data:newCat
        })
        
    } catch (error) {
        res.status(500).json({
            message:"server error",
            error:error.message

        })
    }
}




const getAllICat = async (req, res) => {

    try {
     

        const categories = await Category.find()

        console.log("cat",categories)
       
        res.status(200).json({
            message: "All catergories was fetching",
            data: categories
        })




    } catch (err) {
        res.status(500).json({
            message: "server error"
        })

    }



}







const getCatBasedId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "category ID is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "invalid category id"
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "category not found"
      });
    }

    res.status(200).json({
      message: "Fetching category Done",
      data: category
    });

  } catch  (error) {
  console.log(error); // 👈 ADD THIS

  res.status(500).json({
    message: "server error",
    error: error.message // 👈 helps debugging
  });

  }
};



const getCatBYDepId=async(req,res)=>{

    try {

        const {departmentId}=req.params
        if(!departmentId){
            return res.status(400).json({
                message:"department id is required"
            })
        }


        const categories = await Category.find({Department:departmentId}) 
        if(!categories ){

             return res.status(404).json({
            message:"no categories for this department"
             })
        }


        res.status(200).json({
            message:"all data was fetching ",
            data:categories

        })
       





        
    } catch (error) {

        res.status(500).json({
            message:"server error",
            error:error.message
        })


        
    }




}







module.exports={

    createCategory,
    getAllICat,
    getCatBasedId,
    getCatBYDepId

}