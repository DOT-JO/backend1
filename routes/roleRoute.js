const express =require("express");
const { createRole } = require("../controllers/roleController");
const roleRouter =express.Router()

roleRouter.post("/create", createRole);

module.exports=roleRouter
