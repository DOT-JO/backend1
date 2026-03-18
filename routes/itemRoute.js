const express = require("express");
const { createItem, getAllItems, getItemBasedId, getItemBasedName, updateOneItem, updateItemBasedId, hardDeleted, softDelete } = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.post("/create", createItem)
itemRouter.get("/all",getAllItems)
itemRouter.get("/filter",getItemBasedName)
itemRouter.get("/:itemId",getItemBasedId)
itemRouter.put("/update", updateOneItem)
itemRouter.put("/updated-item/:itemId",updateItemBasedId)
itemRouter.delete("/delete",hardDeleted)
itemRouter.patch("/softDelete/:itemId",softDelete)



module.exports= itemRouter;
