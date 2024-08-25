const CustomError=require('../errors/index')
const checkPermissions=({requestUser,resourceUserId})=>{
    //console.log(requestUser)
    // console.log(resourceUserId)
    if(requestUser.role==='admin') return;
    if(requestUser.userId===resourceUserId.toString()) return
    throw new CustomError.UnauthorizedError('not authorized to view this details')

}
module.exports={checkPermissions}