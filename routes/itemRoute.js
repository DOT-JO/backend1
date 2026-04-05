const express = require("express");
const {upload} =require("../config/cloudinary")
const { createItem, getAllItems, getItemBasedId, getItemBasedName, updateOneItem, updateItemBasedId, hardDeleted, softDelete, getItemsByCat } = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.post("/create", upload.single('image'),createItem)
itemRouter.get("/all",getAllItems)
itemRouter.get("/filter",getItemBasedName)
itemRouter.get("/:itemId",getItemBasedId)
itemRouter.put("/update", updateOneItem)
itemRouter.put("/updated-item/:itemId",updateItemBasedId)
itemRouter.delete("/delete",hardDeleted)
itemRouter.patch("/softDelete/:itemId",softDelete)


itemRouter.get('/byCategory/:categoryId',getItemsByCat)




module.exports= itemRouter;
