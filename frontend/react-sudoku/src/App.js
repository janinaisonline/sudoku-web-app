import { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import './App.css';

function SudokuGame() {
    const [key, setKey] = useState(0);
    // const [sudokuGrid, setSudokuGrid] = useState(null);
    // const [difficulty, setDifficulty] = useState("easy");

    const regenerateSudoku = () => {
        setKey(prevKey => prevKey + 1); // Change the key to force re-render
    };

    // const fetchSudoku = async (level) => {
    //     try {
    //         const response = await fetch(`http://localhost:5099/api/sudoku/${level}`);
    //         const data = await response.json();
    //         setSudokuGrid(data.grid);
    //     } catch (error) {
    //         console.error("Error fetching Sudoku:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchSudoku(difficulty);
    // }, [difficulty]);

    return (
        <div className="sudoku-game">
            <h1>Sudoku Player</h1>
            {/* {sudokuGrid ? <SudokuGrid grid={sudokuGrid} /> : <p>Loading...</p>} */}
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