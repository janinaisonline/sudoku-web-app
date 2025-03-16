import { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import './App.css';

function SudokuGame() { 
    const [key, setKey] = useState(0);
   
    const regenerateSudoku = () => {
        setKey(prevKey => prevKey + 1); // Change the key to force re-render
    };

    return (
        <div className="sudoku-game">
            <h1>Sudoku Player</h1>
            <SudokuGrid key={key}/>
            <button onClick={regenerateSudoku}>Generate new sudoku</button>
            <div className="difficulty-container">
                <button onClick={() => setDifficulty("easy")} className="difficult-level">Easy</button>
                <button onClick={() => setDifficulty("easy")} className="difficult-level">Medium</button>
                <button onClick={() => setDifficulty("easy")} className="difficult-level">Hard</button>
            </div>
        </div>
    );
}

export default SudokuGame;