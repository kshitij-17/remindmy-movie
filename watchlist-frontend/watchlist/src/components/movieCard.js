import React  from "react";
import "./moviecard.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { img_300, unavailable } from "./config";
export const MovieCard=({
    userId,
    id,
    title,
    first_air_date,
    poster
})=>{
 
    const addToWatchlist=()=>{
        const details={
            userId:userId,
            year:first_air_date,
            mov_name:title,
            poster:poster,
            RemindAt:null,
            isRemind:false
        }
    
        axios.post(`http://localhost:5000/watchlists/add/${userId}`,details)
        .then((res)=>{
            if(res.data)
            {
                toast('Added to your watchlist')
                // console.log(res.data)
            }
        })
        .catch((error)=>{
            if(error.response)
            {
                
                toast(error.response.data.error+" in your watchlist")
                
                
            }
            
        })
    }
    return (
        <div className="mainhover" onClick={addToWatchlist}>
        <div className="MCard">
            <div id="visin"  >
            <b >Add to watchList</b>
            </div>
            <img className="poster1" src={poster?`${img_300}${poster}` : unavailable} alt={title}/>
            <b className="title1">{title}</b>
            <span className="year1">{first_air_date}</span>
            
            
        </div>
        <ToastContainer
        position="top-center"
        autoClose={1000}
        />
        </div>
    )
}