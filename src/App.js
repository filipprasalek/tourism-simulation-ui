import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Routes from "./routes";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes/>
        </div>
    );
}

export default App;
