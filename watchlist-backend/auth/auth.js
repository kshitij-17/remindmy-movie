
const {validationResult}=require('express-validator')
const User=require('../models/user.model')

exports.signup=(req,res)=>{

    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const phone=req.body.phone;
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    else{
    const newUser=new User({
        username,
        email,
        password,
        phone
    })
    newUser.save((err,users)=>{
        if(err)
        {
            return res.status(400).json({
                error:"User already exists or some other error occured"
            })
        }
        return res.json({
            message:"Successfully registersed!",
            users
        })
    })

    
}
}