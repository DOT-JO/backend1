
let users=[
{name:"Ahmad", id:1},
{name:"Mohammad", id:2},
{name:"Raghad", id:3}
]


const getAllUsers=(req,res)=>{
    res.status(200)
    res.json({
        message:"this is all users",
        data:users


    })}

    const getUser=(req,res)=>{
    const {id}=req.params

    const user = users.find((Element)=>{
       return Element.id==id
     
    })

    res.status(200)
    res.json({
        message:`this is the user ${id}`,
        data:user
    })

    }

    const getUserQuery=(req,res)=>{

    const {name}=req.query
    const user =users.find((Element)=>{
        return Element.name==name

    })

    if(!user){
        res.status(404)
        res.json(
            {
                message:"user not found"
            }
        )
    }

    res.status(200)
    res.json({data:user})
  
    }
    

const createUser=(req,res)=>{

    const {name , id}=req.body
    users.push({name , id})

    res.status(200)
    res.json({
        message:"new user was created "
    })

    console.log("all users",users)

}


const updateAll=(req,res)=>{
    const {name}=req.params
    const {data}=req.body
    let user =users.find((Element)=>{
       return Element.name===name

    })

    user=data

    
    res.status(200)
    res.json({
        message:`user was updated`,
      data:user
 

    })


    console.log(data)

}

const updateUserName=(req,res)=>{
    

    const {id}=req.params;
    const {name}=req.body;

    console.log("id for show",id)


    let user =users.find((Element)=>{
        return Element.id==id
     })

     if(!user){
        res.status(404).json(
            {
                error:"check Not Found"
            }
        )
     }

     user.name = name


     res.status(200)
     res.json({
        message:"was updated"
     })

   


}



const deleteUser=(req,res)=>{
    const {id}=req.params;

    const users=users.filter((Element)=>
    {

        return Element.id!==id

    })

    res.status(200)
    res.json()


}

    module.exports={
        getAllUsers,
        getUser,
        getUserQuery,
        createUser,
        updateAll,
        updateUserName,
        deleteUser
    }