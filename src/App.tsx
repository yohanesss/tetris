import React from "react";
import { Tetris } from "./components/Tetris";
import { Bgm } from "./components/Bgm";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Bgm />
            <Tetris />
        </div>
    );
}

export default App;
