const CustomError=require('../errors/index')
const {isTokenValid}=require('../utils/index')

const authenticateUser=(req,res,next)=>{
    const token=req.signedCookies.token
    if(!token){
        throw new CustomError.UnauthenticatedError('no permission')
    }
    try{
    const {name,userId,role}=isTokenValid({token:token})
    req.user={name,userId,role}//we pass this details with req because using this role we can authorize based on whether the user is admin or just user
    // console.log(req.user)
    next();
    }
    catch(err){
        throw new CustomError.UnauthenticatedError(err)
    } 
}

const authorizePermissions=(...roles)=>{//we pass in the roles when we call the function in user routes and ppl with those roles would have authorization to access info
    return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new CustomError.UnauthorizedError('unauthorized')
    }
    next();
}
}
module.exports={
    authenticateUser,authorizePermissions
}