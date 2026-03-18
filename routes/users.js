const express=require('express');
const { getAllUsers, getUser, getUserQuery, createUser, updateAll, updateUserName, deleteUser, addNewItemToUser } = require('../controllers/userController');

const userRouter=express.Router();

userRouter.get("/all",getAllUsers);
userRouter.get("/all/:id",getUser)
userRouter.get("/filter",getUserQuery)
userRouter.post("/create",createUser)

userRouter.put("/update/:name",updateAll)
userRouter.patch("/update/user/:id",updateUserName)
userRouter.delete("/users/delete/:id",deleteUser)
userRouter.post("/new-item/:userId",addNewItemToUser)
module.exports=userRouter
