import { useState, useEffect } from "react";
import "./SudokuGrid.css";

const SudokuGrid = ({ difficulty }) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {

        const endpoint = `http://localhost:5099/api/sudoku/${difficulty}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => setGrid(data.grid))
            .catch(error => console.error("Error fetching Sudoku", error));
    }, [difficulty]);

    return (
        <div className="sudoku-container">
            <div className="sudoku-grid">
            {grid.map((row, rowIndex) =>
                    row.map((num, colIndex) => {
                        // determine border thickness based on 3x3 grid layout
                        const isTopBorder = rowIndex % 3 === 0;
                        const isLeftBorder = colIndex % 3 === 0;
                        const isBottomBorder = rowIndex === 8;
                        const isRightBorder = colIndex === 8;

                        const cellStyle = {
                            borderTop: isTopBorder ? "2px solid black" : "1px solid black",
                            borderLeft: isLeftBorder ? "2px solid black" : "1px solid black",
                            borderRight: isRightBorder ? "2px solid black" : "",
                            borderBottom: isBottomBorder ? "2px solid black" : "",
                        };

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`sudoku-cell ${num === 0 ? "empty" : ""}`}
                                style={cellStyle}
                            >
                                {num !== 0 ? num : ""}
                            </div>
                        );
                    })
                )}
                {/* {grid.flat().map((num, index) => (
                    <div
                        key={index}
                        className={`sudoku-cell ${num === 0 ? "empty" : ""}`}
                    >
                        {num !== 0 ? num : ""}
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default SudokuGrid;
