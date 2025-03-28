import { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import './App.css';
import "./css-imports.js";

function SudokuGame() { 
    const [difficulty, setDifficulty] = useState("easy"); // default difficulty
    const [key, setKey] = useState(0);
   
    const regenerateSudoku = () => {
        setKey(prevKey => prevKey + 1); // change the key to force re-render
    };

    const changeDifficulty = (level) => {
        setDifficulty(level);
        setKey(prevKey => prevKey + 1); // trigger refresh
    };

    return (
        <div className="sudoku-game">
            <h1>Sudoku Player</h1>
            <SudokuGrid key={key} difficulty={difficulty} />
            <div className="update-buttons">
                <div className="difficulty-container">
                    <button onClick={() => changeDifficulty("easy")} className="difficulty-level">Easy</button>
                    <button onClick={() => changeDifficulty("medium")} className="difficulty-level">Medium</button>
                    <button onClick={() => changeDifficulty("hard")} className="difficulty-level">Hard</button>
                </div>
                <button className="regenerate-button" onClick={regenerateSudoku}>Generate new sudoku</button>
            </div>
        </div>
    );
}

export default SudokuGame;