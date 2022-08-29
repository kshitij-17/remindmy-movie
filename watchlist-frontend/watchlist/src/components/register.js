import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import '../App.css'
import { Button } from "@material-ui/core";
export const Register=()=>{
    const Navigate=useNavigate();
    const [initialUser,setUser]=useState({
        username:'',
        email:'',
        password:'',
        phone:''
    });

    const onChangeName=(Name)=>{
        setUser({...initialUser,username:Name})
    }
    const onChangeEmail=(mail)=>{
        setUser({...initialUser,email:mail})
    }
    const onChangePassword=(pass)=>{
        setUser({...initialUser,password:pass})    
    }
    const onChangePhone=(num)=>{
        setUser({...initialUser,phone:num})
    }
    const OnSubmit=(e)=>{
        e.preventDefault();
        const details={
            username:initialUser.username,
            email:initialUser.email,
            password:initialUser.password,
            phone:initialUser.phone
        }
        axios.post('http://localhost:5000/users/register',details)
        .then((res)=>{
            if(res.data)
            {
                console.log(res.data)
                Navigate('/')
                
                
            }
        })
        .catch((error)=>{
            if(error.response)
            alert(error.response.data.error)
            
        })
        
    }
    return(
        <div className="form-register">
            <div className="container">
            <form id="form-regi" >
                <fieldset>
                    <legend>Register</legend>
                    <div className="user-details">
                    <div className="input-box">
                        <label htmlFor="username1">First Name:</label>
                        <input type="text" value={initialUser.username} id="username1" onChange={(e)=>onChangeName(e.target.value)}/>
                        </div>
                    <div className="input-box">
                    <label htmlFor="password1">Password:</label>
                        <input type="password" value={initialUser.password} id="password1" onChange={(e)=>onChangePassword(e.target.value)}/>
                    
                    </div>
                    <div className="input-box">
                        <label htmlFor="email1">Email:</label>
                        <input type="email" value={initialUser.email} id="email1" onChange={(e)=>onChangeEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="phone1">Phone Number:</label>
                        <input type="tel" value={initialUser.phone} id="phone1" onChange={(e)=>{onChangePhone(e.target.value)}}/>
                    </div>
                    </div>
                    <div className="submit-button">
                    <Button className="butit" variant="outlined" onClick={OnSubmit}>Register</Button>
                    </div>
                </fieldset>
                <Link to='/'>Back to Sign in</Link>
            </form>
            </div>
        </div>
    )

}