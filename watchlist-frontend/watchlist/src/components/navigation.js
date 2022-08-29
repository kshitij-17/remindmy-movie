import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "../App.css"
import { useNavigate } from 'react-router-dom';

export default function TopNavigation({userId}) {
  const Navigate=useNavigate()
  const [value, setValue] = React.useState('recents');

  const Signout=()=>{
    window.localStorage.removeItem("isLoggedinmovies");
    Navigate('/');
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <BottomNavigation value={value} onChange={handleChange} showLabels className="navClass" style={{backgroundColor:"black"}}>
      <BottomNavigationAction  label="Movies" onClick={()=>Navigate(`/home/movies/${userId}`)} icon={<MovieCreationIcon />} style={{color:"white"}}/>
      <BottomNavigationAction  label="Series" onClick={()=>Navigate(`/home/series/${userId}`)} icon={<TvIcon/>} style={{color:"white"}} />
      <BottomNavigationAction  label="Watchlist" onClick={()=>Navigate(`/home/watchlist/${userId}`)} icon={<PlaylistAddIcon/>} style={{color:"white"}} />
      <BottomNavigationAction  label="Search"  icon={<SearchIcon/>} onClick={()=>Navigate(`/home/search/${userId}`)} style={{color:"white"}}/>
      <BottomNavigationAction  label="Log out"  icon={<ExitToAppIcon/>} onClick={()=>Signout()} style={{color:"white"}}/>
      
    </BottomNavigation>
    </>
  );
}
