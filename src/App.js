import { useState } from 'react';
import './App.css';
import User from './component/user';
import Home from "./component/home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState("");

   let arr = [];
   while (arr.length < 25) {
     let r = Math.floor(Math.random() * 100) + 1;
     if (arr.indexOf(r) === -1) arr.push(r);
   }


  return <div className="App">
      
      <Router>
        <Route path="/" exact render={routerProps => <User {...routerProps} user={user} setUser={setUser} />} />
        <Route path="/home" exact render={routerProps => <Home {...routerProps} user={user} arr={arr} setUser={setUser} />} />
      </Router>
    </div>;
}

export default App;
