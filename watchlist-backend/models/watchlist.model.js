const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const watchlistSchema=new Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  year:{type:String},
  mov_name:{type:String,required:true},
  poster:{type:String},
  RemindAt:{type:String},
  isRemind:Boolean
})

const Watchlist=mongoose.model('Watchlist',watchlistSchema);
module.exports=Watchlist