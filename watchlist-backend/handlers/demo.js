module.exports=()=>{
    const Watchlist=require('../models/watchlist.model')
    let User=require('../models/user.model')
    const nodemailer=require('nodemailer') 
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD

        },
        port:465,
        host: 'smtp.gmail.com',

    })
    Watchlist.find({isRemind:true})
    .then((res)=>{
        if(res)
        {
            res.forEach(response=>{
                const userid=response.user_id
                const moviename=response.mov_name
                const now=new Date()
                const watchid=response._id
                now.toLocaleString('en-US',{timeZone:'Asia/Kolkata'})
                if(new Date(response.RemindAt)-now<0)
                {
                    User.findOne({_id:userid})
                .then((user)=>{
                    const mailoptions={
                        from:"mymovieappservice@gmail.com",
                        to:user.email,
                        subject:"Movie Reminder",
                        text:"Hey! Grab a tub of pop corn and get ready to watch \n"+moviename
                    }
                    transporter.sendMail(mailoptions,(error,info)=>{
                        if(error){
                            console.log(error)

                        }
                        else
                        {
                            Watchlist.findOneAndUpdate({_id:watchid},{isRemind:false},{new:true})
                            .then(()=>console.log('Updated successfully!'))
                            .catch(err=>console.log(err))
                            console.log("Email sent"+info.response)
                        }
                    })
                })
                .catch((error)=>{
                  console.log("error")  
                })
                }
                
                
            })
            
        }
    })
    .catch((error)=>{
        console.log(error.response)
    })
    
}