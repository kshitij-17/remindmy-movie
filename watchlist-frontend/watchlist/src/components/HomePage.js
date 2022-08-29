import React, { useEffect } from "react";
import '../App.css'
import { Outlet, useParams } from "react-router-dom";
import TopNavigation from "./navigation";
import Header from "./header";
import { useNavigate } from "react-router-dom";
export const Home=()=>{
    const {id}=useParams();
    const Navigate=useNavigate()
    useEffect(()=>{
        const isLogged=window.localStorage.getItem("isLoggedinmovies");
        if(!isLogged)
        {
            Navigate('/');
        }
    },[])
    
    return (
        <div className="xyz">
            <Header/>
            <div>
            <TopNavigation userId={id}/>
            </div>
            <Outlet/>
            
        </div>
    )
}