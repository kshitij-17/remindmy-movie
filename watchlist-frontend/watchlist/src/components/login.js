import React, { useState,useEffect } from "react";
import axios from "axios";
import '../App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
export const Login=()=>{
    const [initialUser,setUser]=useState({
        email:'',
        password:'',
    });

    useEffect(() => {
      const isLogged=window.localStorage.getItem("isLoggedinmovies")
      if(isLogged)
      Navigate(`/home/movies/${isLogged}`)
    }, [])
    

    const Navigate=useNavigate();
    const onChangeEmail=(mail)=>{
        setUser({...initialUser,email:mail})
    }
    const onChangePassword=(pass)=>{
        setUser({...initialUser,password:pass})    
    }
    const OnSubmit=(e)=>{
        e.preventDefault();
        const details={
            
            email:initialUser.email,
            password:initialUser.password,
            
        }
        axios.post('http://localhost:5000/users/signin',details)
        .then((res)=>{
            if(res.data)
            {
                //console.log(res.data)
                const userid=res.data._id
                toast('Login successful!')
                setTimeout(()=>{
                    window.localStorage.setItem("isLoggedinmovies",userid)
                    Navigate(`/home/movies/${userid}`)
                    
                },2500)
                
            }
        })
        .catch((error)=>{
            if(error.response)
            toast(error.response.data.error)
        })
        
    }
    return(
        
        <div className="form-register">
            <div className="container">
            <form id="form-regi" >
                <fieldset>
                    <legend className="title">Login</legend>
                    <div className="user-details">
                    <div className="input-box">
                        <label htmlFor="email1"> Email: </label>
                        <input type="email" value={initialUser.email} id="email1" onChange={(e)=>onChangeEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="password1">  Password: </label>
                        <input type="password" value={initialUser.password} id="password1" onChange={(e)=>onChangePassword(e.target.value)}/>
                    </div>
                    </div>
                    <div className="submit-button">
                    <Button className="butit"  variant="outlined" onClick={OnSubmit}>SignIn</Button>
                    </div>
                </fieldset>
                <Link to='/signup'>Sign Up?</Link>
            </form>
            </div>
            <ToastContainer />
        </div>
    )

}