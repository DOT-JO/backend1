
const Item = require("../models/itemSchema")
const mongoose =require("mongoose")

const createItem = async (req, res) => {

    try {

        const { name, category, image } = req.body;
        if (!name || !category) {
            return res.status(400).json({
                message: "name , category are required"
            })

        }

        const existItem = await Item.findOne({ name })

        if (existItem) {
            return res.status(409).json({
                message: "this item is already exists"
            })
        }




        const newItem = await Item.create({

            name,
            category,
            image

        })

        res.status(201).json({
            message: "new item was created sucessfully",
            data: newItem
        })



    } catch (error) {

        res.status(500).json({
            message: "server error"
        })


    }


}

const getAllItems = async (req, res) => {

    try {
        // const items = await Item.find().select("").limit(0)

        const items = await Item.find({isDeleted:false})
        res.status(200).json({
            message: "All items was fetching",
            data: items
        })




    } catch (err) {
        res.status(500).json({
            message: "server error"
        })

    }



}


const getItemBasedId = async (req, res) => {


    try {

        const {itemId}=req.params
      if(!itemId){
          return res.status(400).json({
            message:"item ID i required"
        })

      }

     if(!mongoose.Types.ObjectId.isValid({itemId})){
        return res.status(400).json({
            message:"invalid item id"
        })

     }



        const item = await Item.findById(itemId)

        if(!item) {

            return res.status(404).json({
                message:"Item not found"
            })
        }


        res.status(200).json({
            message:"Fetching item Done",
            data:item
        })

    }
    catch (error) {
        
        res.status(500).json({
            message:"server error"
        })

    }

}

// filtering or search
const getItemBasedName =async (req,res)=>{
    try {

        const {name}=req.query
       

        if(!name){
            return res.status(400).json({
                message:"name is requierd"
            })
        }
      
        const item = await Item.findOne({name})
   

        if(!item){

            return res.status(404).json({
                message:"item was not found"

            })

        }

        res.status(200).json({
            message:"Fetching Item was done",
            data:item

        })

        
    } catch (error) {
        res.status(500).json({
            message:"server error"
        })
        
    }


}



const updateOneItem = async(req,res) =>{
    try{

        const {name ,category ,image} = req.body;

        if(!name){
            return res.status(400).json({
                message:"Name is required"
            })
        }

        console.log("name",name)

        const UpdatedItem = await Item.findOneAndUpdate(
            {name},   //filter 
            {category ,image}, //update 
            {new :true}   //delete
            )



            // const UpdatedItem =await Item.updateOne{
            //        {name},
            // {category ,image},

            // } 

            res.status(200).json({
                message:"item was updated successfully",
                data:UpdatedItem

            })



    }catch(err){
        res.status(500).json({
            message:"server Error"
        })
    }
}


const updateItemBasedId =async (req,res)=>{

    try{

        const {itemId} =req.params
        const {name ,category ,image} =req.body

        if(!itemId){
            res.status(400).json({
                message:"item ID is required"
            })
        }

         if(!mongoose.Types.ObjectId.isValid(itemId)){
           
            return res.status(400).json({
                message:"invalid item id"
            })
         }

         if(!name ||! category || !image)
         {
            res.status(400).json({
                message:"image ,category and name is required"
            })

         }

         const existItem = await Item.findOne({name})
         if(existItem){
            return res.status(409).json({
                message:"name is already registerd"
            })

         }


         const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            {category,image ,name},
            {new:true}

         )

         if(!updatedItem){
            return res.status(404).json({
                message:"Item not Found"

            })
         }


         res.status(200).json({
            message:"item was upadted",
            data:updatedItem

         })



        




    }catch(err){

        res.status(500).json({
            message:"server error"


        })

    }



}


const hardDeleted= async(req,res)=> {

    try {

        const {name}=req.query;

        if(!name){

            return res.status(400).json({
                message:"name is required"
            })

        }


        await Item.deleteOne({name})
        res.status(200).json({
            message:"item was deleted sucessfully"
        })
        
    } catch (error) {

        res.status(500).json({
            message:"server error"
        })
        
    }

}







const softDelete =async(req,res)=>{

    const {itemId} = req.params;

    if(!itemId){

        return res.status(400).json({
            message:"item ID is requierd"
        })
    }

    await Item.updateOne(
        {_id:itemId},
        {isDeleted:true}

    )

    res.status(200).json({

   

        message:"item was deleted"
    })

    

    

    try{

    }catch(err){
        res.status(500).json({
            message:"server error"
        })

    }

}








module.exports = {
    createItem,
    getAllItems,
    getItemBasedId,
    getItemBasedName,
    updateOneItem,
    updateItemBasedId,
    hardDeleted,
    softDelete
}