const express=require('express');
const { getAllUsers, getUser, getUserQuery, createUser, updateAll, updateUserName, deleteUser, addNewItemToUser, register, login } = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');

const userRouter=express.Router();

userRouter.get("/all",authentication,authorize("read-only"),getAllUsers);
userRouter.get("/all/:id",getUser)
userRouter.get("/filter",getUserQuery)
userRouter.post("/create",createUser)

userRouter.put("/update/:name",updateAll)
userRouter.patch("/update/user/:id",updateUserName)
userRouter.delete("/users/delete/:id",deleteUser)
userRouter.post("/new-item/:userId",addNewItemToUser)
userRouter.post("/register",register)
userRouter.post("/login",login)
module.exports=userRouter
