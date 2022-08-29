import React  from "react";
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Home } from "./components/HomePage";
import { WatchListpage } from "./components/watchListpage";
import { Movies } from "./components/movies";
import { Series } from "./components/series";
import { Search } from "./components/search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        
        <Route  path='/' element={<Login/>}/>
        <Route  path='/signup' element={<Register/>}/>
        <Route  path='/home' element={<Home/>}>
          <Route path='/home/movies/:id' element={<Movies/>}/>
          <Route path="/home/series/:id" element={<Series/>}/>
          <Route path='/home/watchList/:id' element={<WatchListpage/>}/>
          <Route path='/home/search/:id' element={<Search/>}/>
        </Route>
        
        </Routes>

      </Router>
     
    </div>
  );
}

export default App;
