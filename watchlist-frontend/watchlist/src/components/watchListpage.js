import React, { useState,useEffect } from "react"
import axios from "axios"
import "./watchlistPage.css"
import ServerModal from "./TimeModal"
import { unavailable,img_300 } from "./config"
import { useParams } from "react-router-dom"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@material-ui/core"
export const WatchListpage=({})=>{
   
    const {id}=useParams()
    const [modal,setModal]=useState(true)
    const [movid,setmovid]=useState('')
    const [whichModal,setWhichModal]=useState(true)
    const [content,setContent]=useState([])
    const fetchMovie=async ()=>{
        await axios.get(`http://localhost:5000/watchlists/${id}`)
        .then((response)=>{
            setContent(response.data)
            // console.log(response.data)
        })
        .catch((error)=>{
            console.log(error.response)
        })
        
    }
    useEffect(() => {
      fetchMovie()
    }, [modal])
    
    const callButton1=(_id)=>{
        setmovid(_id)
        setWhichModal(true);
        setModal(false)
        // console.log(_id)

    }

    const callButton2=(_id)=>{
        setmovid(_id)
        setWhichModal(false);
        setModal(false)
        // console.log(_id)

    }
    

    return ( <>
    {modal?(
        <div id="allmov">
            {content && content.map((c)=>
            <div className="CCard" key={c._id}>
                <img className="poster1" src={c.poster?`${img_300}${c.poster}` : unavailable} alt={c.mov_name}/>
                <b className="title1">{c.mov_name}</b>
                <span className="year1">{c.year}</span>
                <br/>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <Button  variant="contained" style={{backgroundColor:c.isRemind?"green":"#D61162"}}  onClick={()=>callButton1(c._id)}>{c.isRemind?"Edit Reminder":"Add Reminder"}</Button>
                <IconButton aria-label="delete" onClick={()=>callButton2(c._id)}>
        <DeleteIcon />
      </IconButton>
      </div>
          
            </div>
)}

        </div>):
        (<ServerModal setModal={setModal} _id={movid} whichModal={whichModal}/>)
}
        </>
    )
}