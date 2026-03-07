const express =require("express")
const userRouter = require("./routes/users")
const app =express()

const PORT =8001

app.use(express.json())





app.use("/users",userRouter)






app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)

})

