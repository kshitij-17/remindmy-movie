import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import axios from "axios";
import { MovieCard } from "./movieCard";
import { useParams } from "react-router-dom"
export const Search=()=>{

    let el=document.getElementById("tff")
    if(el)
    el.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("bff").click();
    }
});

    const {id}=useParams();
    const [searchText,setText]=useState("");
    const [content,setContent]=useState([])
    const fetchMovie=async ()=>{
        try{
        const {data}=await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&include_adult=false`);
        setContent(data.results)
        
        }
        catch(error)
        {
            console.log('error')
        }
    }

    return ( <>
        <div style={{display:"flex",width:"100%",marginBottom:"20px"}}>
        <TextField id="tff" style={{backgroundColor:"white",width:"100%"}} label="Search " variant="filled" onChange={(e)=>setText(e.target.value)}/>
        <button id="bff"
            onClick={fetchMovie}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </button>
          </div>
          <div id="allmov" >
            {content && content.map((c)=>
            <MovieCard  userId={id} key={c.id} id={c.id} title={c.title || c.name || c.original_title} first_air_date={c.release_date || c.first_air_date} poster={c.poster_path} />
)}

        </div>
        
        </>
        
    )
}