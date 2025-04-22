import jwt from "jsonwebtoken"
const verifytoken=(req,res,next)=>{
try {
    const tok=req.headers.authorization?.split(" ")[1]
    if(!tok){
        return res.status(401).json({
            message:"token not found"
        })
    }
    jwt.verify(tok,process.env.SECREATE,(err,decoded)=>{
        if(err){
            return res.status(403).json({
            message:"Invalid token"
        })
        }
        req.userId=decoded._id
        next()
    })
    
} catch (error) {
    res.status(500).json({
        error:'auth mid'
    })
}
}
export {verifytoken}