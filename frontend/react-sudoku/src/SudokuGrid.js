import { useState, useEffect } from "react";
import "./SudokuGrid.css";

const SudokuGrid = ({ difficulty }) => {
    const [grid, setGrid] = useState([]); // constant version fetched from backend
    const [selectedCell, setSelectedCell] = useState(null); // { row: x, col: y }, selectedCell.row, selectedCell.col, both "undefined" by default
    const [userGrid, setUserGrid] = useState([]); // editable version for user interaction

    useEffect(() => {

        const endpoint = `http://localhost:5099/api/sudoku/${difficulty}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setGrid(data.grid);
                setUserGrid(data.grid);
            })
            .catch(error => console.error("Error fetching Sudoku", error));
    }, [difficulty]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCell) return;

            const key = e.key;

            // allow only digits 1 to 9
            if (/^[1-9]$/.test(key)) {
                const row = selectedCell.row;
                const col = selectedCell.col;

                // don't allow editing prefilled cells (check grid not userGrid)
                if (grid[row][col] !== 0) return;
                
                const updatedGrid = userGrid.map(r => [...r]); // deep copy
                updatedGrid[row][col] = parseInt(key);
                setUserGrid(updatedGrid);
            }

            // allow backspace or delete to clear cell
            if (key === 'Backspace' || key === 'Delete') {
                const row = selectedCell.row;
                const col = selectedCell.col;

                if (grid[row][col] !== 0) return;

                const updatedGrid = userGrid.map(r => [...r]);
                updatedGrid[row][col] = 0;
                setUserGrid(updatedGrid);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedCell, userGrid, grid]);

    const isCellInvalid = (row, col) => {
        const value = userGrid[row][col];
        if (value === 0) return false;

        // check row
        for (let c = 0; c < 9; c++) {
            if (c !== col && userGrid[row][c] === value) return true;
        }

        // check col
        for (let r = 0; r < 9; r++) {
            if (r !== row && userGrid[r][col] === value) return true;
        }

        // check 3x3 box
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const currRow = boxStartRow + r;
                const currCol = boxStartCol + c;
                
                if ((currRow !== row || currCol !== col) && userGrid[currRow][currCol] === value) return true;
            }
        }

        return false;
    };

    return (
        <div className="sudoku-container">
            <div className="sudoku-grid">
            {userGrid.map((row, rowIndex) =>
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
                                className={`sudoku-cell
                                    ${grid[rowIndex][colIndex] === 0 ? "user-cell" : "prefilled-cell"} 
                                    ${num === 0 ? "empty" : ""} 
                                    ${isSelected ? "selected" : ""}
                                    ${isCellInvalid(rowIndex, colIndex) ? "error" : ""}
                                `}                            
                                style={cellStyle}
                                onClick={() => {
                                    if (grid[rowIndex][colIndex] === 0 && !isSelected) {
                                        setSelectedCell({ row: rowIndex, col: colIndex })
                                    } else {
                                        setSelectedCell(null);
                                    }
                                }}
                                // alternative way for the function
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
