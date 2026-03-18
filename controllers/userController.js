const userModel =require("../models/userSchema")
const Item =require("../models/itemSchema")
let users=[
{name:"Ahmad", id:1},
{name:"Mohammad", id:2},
{name:"Raghad", id:3}
]


const getAllUsers=(req,res)=>{

    userModel.find({}).populate("items").then((result)=>{
    res.status(200)
    res.json(result)


    }).catch((err)=>{
        res.send(err)

    })
  
}

    const getUser=(req,res)=>{
    const {id}=req.params

    const user = users.find((Element)=>{
       return Element.id==id
     
    })

    res.status(200)
    res.json({
        message:`this is the user ${id}`,
        data:user
    })

    }

    const getUserQuery=(req,res)=>{

    const {name}=req.query


    userModel.findOne({name}).then((result)=>{

        res.status(200).json(result)

    }).catch((err)=>{
        res.status(500).json()
        message:"faild"
    })


    // const user =users.find((Element)=>{
    //     return Element.name==name

    // })



  
    }
    

const createUser=(req,res)=>{

    const {name,email,password}=req.body

    if(!email){
        res.status(404).json({
            message:"Email Not Found"
        })
    }

        const user = new userModel({
            email,
            name,
            password,
        })

        user.save().then(()=>{

            res.status(201).json({
                message:"new user was created"
            }).catch((err)=>{
                res.status(500).json({
                    message:"failed"
                })

            })

        })

    
  
  

}


const updateAll=(req,res)=>{
    const {name}=req.params
    const {data}=req.body
    let user =users.find((Element)=>{
       return Element.name===name

    })

    user=data

    
    res.status(200)
    res.json({
        message:`user was updated`,
      data:user
 

    })


    console.log(data)

}

const updateUserName=(req,res)=>{
    

    const {id}=req.params;
    const {name}=req.body;

    console.log("id for show",id)


    let user =users.find((Element)=>{
        return Element.id==id
     })

     if(!user){
        res.status(404).json(
            {
                error:"check Not Found"
            }
        )
     }

     user.name = name


     res.status(200)
     res.json({
        message:"was updated"
     })

   


}



const deleteUser=(req,res)=>{
    const {id}=req.params;

    const users=users.filter((Element)=>
    {

        return Element.id!==id

    })

    res.status(200)
    res.json()


}


const addNewItemToUser = async (req,res)=>{
try {
console.log("hiii")
     const {userId}=req.params
    const {name,category,image} =req.body
console.log("hiii")
    if(!userId){
        return res.status(400).json({

            message:"user Id is requierd"

        })



    }


    if(!name || !category){
        return res.status(400).json({
            message:"name and category is required"
        })
    }
//   console.log(name,"name")


   
    const newItem =await Item.create({
        name,
        category,
        image

    })
console.log(newItem)
  console.log(name,"name")

     const user = await userModel.findById(userId)

 

if(!user){

   return res.status(404).json({
        message:"user not found"
    })

}


user.items.push(newItem._id)



await user.save()

res.status(200).json({
        message:"new user was added",
        data:user
    }
)





    
} catch (error) {

 
    console.log(error); // 👈 ADD THIS
    res.status(500).json({
        message:"server error",
        error: error.message // 👈 ADD THIS
    })

    
}
   
}

    module.exports={
        getAllUsers,
        getUser,
        getUserQuery,
        createUser,
        updateAll,
        updateUserName,
        deleteUser,
        addNewItemToUser
    }