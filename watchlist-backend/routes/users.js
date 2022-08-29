const {check}=require('express-validator')
const router=require('express').Router();
let User=require('../models/user.model')
const {signup}=require('../auth/auth')


router.post('/register',[check("username","Name should be atlest 3 characters long").isLength({min:3}),
check("email","This is not a valid email").isEmail(),
check("password","Password should be minumum 6 charaacters large").isLength({min:6}),
check("phone","Not a valid phone number").isMobilePhone(),
],signup)

router.route('/signin').post((req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email})
    .then(user=>{
        if(user.length!=0)
        {
            if(password==user.password)
            {
                res.json(user)
            }
            else
            {
                res.status(400).json({'error':'incorrect password'})
                
            }
        }
        else
        {
            res.status(400).json({'error':'something went wrong'})
        }

    })
    .catch(err=>res.status(400).json({'error':'Either Email or password is wrong'}))

    
})



router.route('/').get((req,res)=>{
    User.find()
    .then(response=>res.json(response))
    .catch(err=>res.status(400).json('Error:'+err))
})




router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('User successfully removed!'))
    .catch(err=>res.status(400).json('Error:'+err));
})
module.exports=router