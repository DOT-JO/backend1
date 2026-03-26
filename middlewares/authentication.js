const jwt =require("jsonwebtoken")




const authentication=(req,res,next)=>{
console.log("req.headers",req.headers)

const authDetials =req.headers.authorization;   //to access the headers token from the client/frontend  object req
//the auth normally have "bearer token"


if (!authDetials) {
    return res.status(401).json({
        message: "authorization header missing"
    });
}
  
console.log("authDetials",authDetials)
const token =authDetials.split(" ")[1];       //split to acces to the second part (the token) from the authorization part in the headers


if(!token){
    return res.status(401).json({
        message:"token was not provided"

    })
}
try {

    const decoded =jwt.verify(token,process.env.JWT_SECRET)    //check if the token is vaild and trusted and read the token(take the info like user id ...)
    req.user= decoded                                     //  We attach the user info to the request so we can use it later...make it available for all next functions]
                                                          // Why this is useful:  Instead of decoding the token again in every route 
                                                          //You do it once in middleware and reuse it everywhere           
                                                          
next()
    
} catch (error) {

    return res.status(403).json({
        message:"Token invailed /expired"})
    


}




}


module.exports=authentication