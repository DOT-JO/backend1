const express= require("express")
const { createCategory, getAllICat, getCatBasedId, getCatBYDepId } = require("../controllers/categoryController")
const categoryRouter=express.Router()

categoryRouter.post("/create",createCategory)
categoryRouter.get("/all",getAllICat)

categoryRouter.get("/:id",getCatBasedId)

categoryRouter.get('/byDepartment/:departmentId', getCatBYDepId);

module.exports=categoryRouter