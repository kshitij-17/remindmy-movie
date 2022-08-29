import React from "react"
import '../App.css'
const Header=()=>{
    return(
        <div className="header2">
        <span id="header1" onClick={()=>window.scroll(0,0)}>My Movies </span>
        </div>
    )
}

export default Header