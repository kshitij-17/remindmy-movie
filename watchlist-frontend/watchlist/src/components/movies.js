import React, { useState,useEffect } from "react"
import axios from "axios"
import { MovieCard } from "./movieCard"
import "./movies.css"
import PaginationTab from "./pagenation"
import { useParams } from "react-router-dom"
export const Movies=()=>{
    const {id}=useParams();
    const [page,setPage]=useState(1)
    const [content,setContent]=useState([])
    const fetchMovie=async ()=>{
        try {
            const {data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}`);
        setContent(data.results)
        } catch (error) {
            console.log("Some issue occured")
        }
        
        // console.log(data.results)
    }
    useEffect(() => {
      fetchMovie()
    }, [page])
    
    return ( <>
        <div id="allmov">
            {content && content.map((c)=>
            <MovieCard userId={id} key={c.id} id={c.id} title={c.title || c.name || c.original_title} first_air_date={c.release_date || c.first_air_date} poster={c.poster_path} />
            
)}

        </div>
        <PaginationTab setPage={setPage}/>
        </>
    )
}