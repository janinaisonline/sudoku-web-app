import { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import './App.css';

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
            <p>Difficulty level: {difficulty}</p>
            <SudokuGrid key={key} difficulty={difficulty} />
            <button onClick={regenerateSudoku}>Generate new sudoku</button>
            <div className="difficulty-container">
                <button onClick={() => changeDifficulty("easy")} className="difficult-level">Easy</button>
                <button onClick={() => changeDifficulty("medium")} className="difficult-level">Medium</button>
                <button onClick={() => changeDifficulty("hard")} className="difficult-level">Hard</button>
            </div>
        </div>
    );
}

export default SudokuGame;