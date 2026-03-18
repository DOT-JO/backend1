const express =require("express")
require("dotenv").config();
const userRouter = require("./routes/users")
const itemRouter = require("./routes/itemRoute")
const app =express()

require("./models/db")
const PORT =8001

app.use(express.json())





app.use("/users",userRouter)
app.use("/items",itemRouter)






app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)

})

