const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    phone:{type:Number,required:true,minlenght:10,unique:true}
},
{timestamps:true}
)

const User=mongoose.model('User',userSchema)
module.exports=User 