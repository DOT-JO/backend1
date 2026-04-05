const bcrypt=require("bcrypt")
const userModel = require("../models/userSchema")
const Role =require("../models/Role")
const Item = require("../models/itemSchema")
const jwt = require("jsonwebtoken")
require('dotenv').config();


let users = [
    { name: "Ahmad", id: 1 },
    { name: "Mohammad", id: 2 },
    { name: "Raghad", id: 3 }
]


const getAllUsers = (req, res) => {

    console.log(req.user)

    userModel.find({}).populate("items").then((result) => {
        res.status(200)
        res.json(result)


    }).catch((err) => {
        res.send(err)

    })

}

const getUser = (req, res) => {
    const { id } = req.params

    const user = users.find((Element) => {
        return Element.id == id

    })

    res.status(200)
    res.json({
        message: `this is the user ${id}`,
        data: user
    })

}

const getUserQuery = (req, res) => {

    const { name } = req.query


    userModel.findOne({ name }).then((result) => {

        res.status(200).json(result)

    }).catch((err) => {
        res.status(500).json()
        message: "faild"
    })


    // const user =users.find((Element)=>{
    //     return Element.name==name

    // })




}


const createUser = (req, res) => {

    const { name, email, password } = req.body

    if (!email) {
        res.status(404).json({
            message: "Email Not Found"
        })
    }

    const user = new userModel({
        email,
        name,
        password,
    })

    user.save().then(() => {

        res.status(201).json({
            message: "new user was created"
        }).catch((err) => {
            res.status(500).json({
                message: "failed"
            })

        })

    })





}


const updateAll = (req, res) => {
    const { name } = req.params
    const { data } = req.body
    let user = users.find((Element) => {
        return Element.name === name

    })

    user = data


    res.status(200)
    res.json({
        message: `user was updated`,
        data: user


    })


    console.log(data)

}

const updateUserName = (req, res) => {


    const { id } = req.params;
    const { name } = req.body;

    console.log("id for show", id)


    let user = users.find((Element) => {
        return Element.id == id
    })

    if (!user) {
        res.status(404).json(
            {
                error: "check Not Found"
            }
        )
    }

    user.name = name


    res.status(200)
    res.json({
        message: "was updated"
    })




}



const deleteUser = (req, res) => {
    const { id } = req.params;

    const users = users.filter((Element) => {

        return Element.id !== id

    })

    res.status(200)
    res.json()


}


const addNewItemToUser = async (req, res) => {
    try {
        console.log("hiii")
        const { userId } = req.params
        const { name, category, image } = req.body
        console.log("hiii")
        if (!userId) {
            return res.status(400).json({

                message: "user Id is requierd"

            })



        }


        if (!name || !category) {
            return res.status(400).json({
                message: "name and category is required"
            })
        }
        //   console.log(name,"name")



        const newItem = await Item.create({
            name,
            category,
            image

        })
        console.log(newItem)
        console.log(name, "name")


        


        const user = await userModel.findByIdAndUpdate(
            {_id:userId},
            {$push:{items:newItem._id}}
            //addtoset
        )



        // const user = await userModel.findById(userId)



        // if (!user) {

        //     return res.status(404).json({
        //         message: "user not found"
        //     })

        // }


        // user.items.push(newItem._id)



        // await user.save()




        res.status(200).json({
            message: "new user was added",
            data: user
        }
        )






    } catch (error) {


        console.log(error); // 👈 ADD THIS
        res.status(500).json({
            message: "server error",
            error: error.message // 👈 ADD THIS
        })


    }

}



const generateToken=(user)=>{
    
    const payload ={
        id: user._id,
        role:user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET,{       //create token
        expiresIn:"1h"
    })

}



const register =async(req,res)=>{

    try {

         const {name,email,password, role="user"}=req.body

    if(!name||!email||!password ||!role){           //validation
       return  res.status(400).json({
            message:"there are a missing data"
        })
    }



    const existEmail= await userModel.findOne({email})      //fetching data

    if(existEmail){
        return res.status(409).json({
            message:"this email is already exist"
        })

    }

    // const hash = await bcrypt.hash(password,10)

    // console.log("hashing password",hash)

 
    const roleDetails =await Role.findOne({ name :role})
     console.log("roleDetails",roleDetails)
    if(!roleDetails){
        return res.status(404).json({

            message:" Role not Found "

        })
    }

    const user =await userModel.create({           //creation
        name,
        email,
        // password:hash,
        password,
        role:roleDetails._id 

    }
    )

    if(!user){
       return  res.status(404).json({
            message:"user was not created"
        })
    }


       const token=generateToken(user)   //direct enter if the user register /not need to login 

   return  res.status(200).json({
        message:"new user was created",
        data:user,
        Token:token

    })
        
    } catch (error) {
       return   res.status(500).json({
        message:"server error",
       error:error.message
    })
    }
   




}



const login=async(req,res)=>{

    try {

        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({
                message:"email and password are required"
            })
        }

     const user =await userModel.findOne({email})

            if(!user){
                return res.status(404).json({
                    message:"user was not registerd"

                })
            }

            const isMatch = await user.comparePassword(password)
    //   const isMatch =await bcrypt.compare(password,user.password)

      if(!isMatch){
        return res.status(404).json({

            message:"password is incorrect"

        })

      }

      const token=generateToken(user)
      res.status(200).json({
        message:"was loged in sucessfully",
        data:user,
        token
      })
       
        
    } catch (error) {
        res.status(500).json({
            message:"server Error",
            err:error.message
        })
        
    }

}



















module.exports = {
    getAllUsers,
    getUser,
    getUserQuery,
    createUser,
    updateAll,
    updateUserName,
    deleteUser,
    addNewItemToUser,
    register,
    login
}