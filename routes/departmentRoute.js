const express= require("express")
const { createDepartment, getAllIDep } = require("../controllers/departmentController")
const departmentRouter=express.Router()

departmentRouter.post("/create",createDepartment)
departmentRouter.get("/all",getAllIDep)

module.exports=departmentRouter