import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Login  from "./components/login";
import Navbar from "./components/navbar";
import Newnav  from './components/newnav';
import Home from "./components/home";
import Delpage from "./components/delpage";

function App() {

  if (!localStorage.getItem('token')){
    return (
      <>
        <Router>
          <Navbar/>
            <div className="App">
              <Routes>
                <Route exact path="/" element={<Login key="login" />}/>
              </Routes>
            </div>
        </Router>
      </>
    );
  }else{
    return(
      <>
      <Router>
        <Newnav/>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home key="home" />}/>
              <Route exact path="/delusers" element={<Delpage key="delpage" />}/>
            </Routes>
          </div>
      </Router>
      </>
    );
  }
}

export default App;