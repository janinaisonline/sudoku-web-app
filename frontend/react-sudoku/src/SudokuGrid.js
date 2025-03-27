import { useState, useEffect } from "react";
import "./SudokuGrid.css";

const SudokuGrid = ({ difficulty }) => {
    const [grid, setGrid] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null); // { row: x, col: y }

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

                        const isSelected =
                            selectedCell?.row === rowIndex &&
                            selectedCell?.col === colIndex;

                        const cellStyle = {
                            borderTop: isTopBorder ? "2px solid black" : "1px solid black",
                            borderLeft: isLeftBorder ? "2px solid black" : "1px solid black",
                            borderRight: isRightBorder ? "2px solid black" : "",
                            borderBottom: isBottomBorder ? "2px solid black" : "",
                        };                      

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`sudoku-cell ${num === 0 ? "empty" : ""} ${isSelected ? "selected" : ""}`}                            
                                style={cellStyle}
                                onClick={() => {
                                    if (num === 0 && !isSelected) setSelectedCell({ row: rowIndex, col: colIndex })
                                    else setSelectedCell(null);
                                }}
                                // onClick={() => {
                                //     if (num !== 0) return; // don't do anything if the cell isn't editable
                                
                                //     if (!isSelected) {
                                //         setSelectedCell({ row: rowIndex, col: colIndex }); // select the cell
                                //     } else {
                                //         setSelectedCell(null); // deselect if already selected
                                //     }
                                // }}
                            >
                                {num !== 0 ? num : ""}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SudokuGrid;
