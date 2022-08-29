const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const config=require('./config')
const scheduler=require('./scheduler')
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI

async function connect(){
    try{
        mongoose.connect(uri)
        console.log("Connected to the database")
    }
    catch(err)
    {
        console.log('Error'+err)
    }
}
connect();

const connection=mongoose.connection;
connection.once('open',()=>{
    scheduler.initCrons(config);
    console.log('connection with the database has been established successfully');
})

const UserRouter=require('./routes/users')
app.use('/users',UserRouter)
const WatchlistRouter=require('./routes/watchlists')
const { schedule } = require('node-cron')
app.use('/watchlists',WatchlistRouter)
const port=process.env.PORT || 5000;




app.listen(port,()=>{
    console.log('listening on port 5000')
})
