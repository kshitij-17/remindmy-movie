const router=require('express').Router();
const Watchlist=require('../models/watchlist.model')

router.route('/add/:id').post((req,res)=>{
    const user_id=req.params.id;
    const year=req.body.year;
    const mov_name=req.body.mov_name;
    const poster=req.body.poster;
    const RemindAt=req.body.RemindAt;
    const isRemind=req.body.isRemind;
    Watchlist.find({$and:[{mov_name},{user_id}]})
    .then(movie=>{
        if(movie.length==0)
        {
            const newMovie=new Watchlist({
                user_id,
                year,
                mov_name,
                poster,
                RemindAt,
                isRemind
            })
            newMovie.save()
            .then(()=>res.json('Movie saved successfully'))
            .catch(err=>res.status(400).json('Error:'+err));
        }
        else
        {
            
            res.status(400).json({'error':'Already Exists'})
        }
        
    } 
    )
    .catch(err=>res.status(400).json('error:'+err))
    
})

router.route('/:id').get((req,res)=>{
    const userid=req.params.id
    Watchlist.find({user_id:userid})
    .then(watchlist=>res.json(watchlist))
    .catch(err=>res.status(400).json('error:'+err));
})

router.route('/').get((req,res)=>{
    Watchlist.find()
    .then(exercies=>res.json(exercies))
    .catch(err=>res.status(400).json('error:'+err))
});

router.route('/delete/:id').delete((req,res)=>{
    Watchlist.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Deleted successfully!'))
    .catch(err=>res.status(400).json('error:'+err))
})

router.route('/update/:id').put((req,res)=>{
Watchlist.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
.then(()=>res.json('Updated successfully!'))
.catch(err=>res.status(400).json('error'+Error))

    
})

module.exports=router