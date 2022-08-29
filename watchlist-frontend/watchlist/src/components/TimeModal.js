import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker'
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ServerModal({setModal,_id,whichModal}) {
  const classes = useStyles();
  const [remindtime,setRemindTime]=useState('')
    // console.log(_id)
  const deleteItem=()=>{
    console.log(_id)
    axios.delete(`http://localhost:5000/watchlists/delete/${_id}`)
    .then((response)=>{
        // console.log(response)
        setModal(true);
    })
    .catch((error)=>{
        
       console.log( error.response)
    })
  }

  const addReminder=()=>{
    // console.log(remindtime)
    if(remindtime)
    {
        const details={
            RemindAt:remindtime,
            isRemind:true
        }
        axios.put(`http://localhost:5000/watchlists/update/${_id}`,details)
        .then((response)=>{
          setRemindTime('');
            setModal(true)
        })
        .catch((error)=>{
            // console.log( error.response)
            setModal(true)
        })
    }
  }


  return (
    <div className={classes.root} >
      <Modal
        open
        
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}>
            
        <div className={classes.paper} >
            {whichModal?(
                <div>
                <DateTimePicker
                value={remindtime}
                onChange={setRemindTime}
                hourPlaceholder='hh'
                dayPlaceholder='DD'
                monthPlaceholder='MM'
                yearPlaceholder='YYYY'
                minDate={new Date() }
                />
                <div >
                  <div>

                  </div>
                  <Button onClick={()=>addReminder()}>Add</Button>
                <Button style={{marginLeft:20,marginTop:5}} onClick={()=>setModal(true)}>Cancel</Button>
                </div>
                </div>
          )
          :
          (
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <p style={{color:"red"}}>Are you sure? </p>
            <br/>
            <button onClick={()=>deleteItem(_id)}>confirm</button>
            <button onClick={()=>setModal(true)}>cancel</button>
            
            </div>
          )
            }
        </div>
      </Modal>
    </div>
  );
}
