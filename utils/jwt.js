const jwt=require('jsonwebtoken')

const createJWT=({payload})=>{//here we setup the function input as object because that way we dont have to worry about the order of variables like if function(int a,intb) means when we give input we should give a first then b but if its object no need to worry
    //console.log(payload)
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return token;
}

const attachCookiesToResponse=({res,user})=>{
    const token=createJWT({payload:user});
    const oneDay=1000*60*60*24//1000 milliseconds per second
    //adding token to cookie 
    res.cookie('token',token,{
        secure:process.env.NODE_ENV==='production',//enables https this willl be true when i porduction but it development it would be false
        signed:true,//used to detect if the cookie is modified
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
    })
}

const isTokenValid=({token})=>jwt.verify(token,process.env.JWT_SECRET)//if we write function like this it directly returns the jwt.verify no need to write manual return statement



module.exports={createJWT,isTokenValid,attachCookiesToResponse}