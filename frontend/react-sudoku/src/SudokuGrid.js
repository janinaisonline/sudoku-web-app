import { useState, useEffect } from "react";
import "./SudokuGrid.css";

const SudokuGrid = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5099/api/sudoku/generate")
            .then(response => response.json())
            .then(data => setGrid(data.grid))
            .catch(error => console.error("Error fetching Sudoku:", error));
    }, []);

    return (
        <div className="sudoku-container">
            <div className="sudoku-grid">
                {grid.flat().map((num, index) => (
                    <div
                        key={index}
                        className={`sudoku-cell ${num === 0 ? "empty" : ""}`}
                    >
                        {num !== 0 ? num : ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SudokuGrid;
