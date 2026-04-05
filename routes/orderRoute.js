const express= require("express")
const createOrder = require("../controllers/OrderController")
const authentication = require('../middlewares/authentication');

const OrderRouter=express.Router()

OrderRouter.post("/create",authentication,createOrder)

module.exports=OrderRouter