const express =require("express")
require("dotenv").config();
const userRouter = require("./routes/users")
const itemRouter = require("./routes/itemRoute");
const roleRouter = require("./routes/roleRoute");
const app =express()

require("./models/db")
const PORT =8001

app.use(express.json())





app.use("/users",userRouter)
app.use("/items",itemRouter)
app.use("/roles",roleRouter)






app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)

})

