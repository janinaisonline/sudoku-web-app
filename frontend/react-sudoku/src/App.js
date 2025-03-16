import { useState } from "react";
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
        </div>
    );
}

export default SudokuGame;