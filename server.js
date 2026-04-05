const express =require("express")
require("dotenv").config();
const userRouter = require("./routes/users")
const itemRouter = require("./routes/itemRoute");
const roleRouter = require("./routes/roleRoute");
const cors=require("cors");
const categoryRouter = require("./routes/categoryRoute");
const departmentRouter = require("./routes/departmentRoute");
const OrderRouter = require("./routes/orderRoute");
const app =express()

require("./models/db")
const PORT =8001
app.use(cors(
 {   origin:"http://localhost:5173"}
))
app.use(express.json())





app.use("/users",userRouter)
app.use("/items",itemRouter)
app.use("/roles",roleRouter)
app.use("/categories",categoryRouter)
app.use("/orders",OrderRouter)
app.use("/departments",departmentRouter)




app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)

})

