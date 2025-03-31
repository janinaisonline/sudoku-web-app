import { useState, useEffect } from "react";
import "./SudokuGrid.css";
import "./css-imports.js";

// SudokuGrid re-renders whenever its state changes (e.g. when setGrid or selectedCell is called) or when its props change (in App.js such as {difficulty})

const SudokuGrid = ({ difficulty }) => {
    const [grid, setGrid] = useState([]); // constant version fetched from backend (2d array)
    const [userGrid, setUserGrid] = useState([]); // editable version for user interaction (2d array)
    const [selectedCell, setSelectedCell] = useState(null); // { row: x, col: y }, selectedCell.row, selectedCell.col, both "undefined" by default

    // timer variables
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    // fetch sudoku grid from API
    useEffect(() => {

        const endpoint = `http://localhost:5099/api/sudoku/${difficulty}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setGrid(data.grid);
                setUserGrid(data.grid);
            })
            .catch(error => console.error("Error fetching Sudoku", error));

        setTimerActive(true);
    }, [difficulty]); // this useEffect function is called when the difficulty changes

    // start timer
    useEffect(() => {
        let interval;

        if (timerActive) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerActive]);

    // handle keyboard clicks
    useEffect(() => {
        const handleKeyDown = (e) => { // this function is called whenever a key is pressed
            if (!selectedCell) return; // returns if no cell is selected

            const key = e.key; // assigns the pressed key to 'key'

            const row = selectedCell.row;
            const col = selectedCell.col;

            // don't allow editing prefilled cells (check grid not userGrid)
            if (grid[row][col] !== 0) return;

            const updatedGrid = userGrid.map(r => [...r]); // create a deep copy

            // if key is a digit between 1 and 9, assign number to cell
            if (/^[1-9]$/.test(key)) {
                updatedGrid[row][col] = parseInt(key);
            }

            // allow backspace or delete to clear cell
            if (key === 'Backspace' || key === 'Delete') {
                updatedGrid[row][col] = 0;
            }

            setUserGrid(updatedGrid); // set userGrid to updatedGrid
        };

        window.addEventListener("keydown", handleKeyDown); // useEffect starts an event listener and calls the handleKeyDown function whenever a key is pressed
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedCell, userGrid, grid]); // this useEffect function is called when one of those three variables changes

    // checks if entered number causes any errors (sudoku logic errors), it is called on every cell whenever the grid re-renders
    // returns true if there is a number conflict and false if there is no conflict
    const isCellInvalid = (row, col) => {
        const value = userGrid[row][col]; // cell value

        if (value === 0) return false; // if the cell is "empty", the function returns false (cell is not invalid)

        // check row, if number is in row return true
        for (let c = 0; c < 9; c++) {
            if (c !== col && userGrid[row][c] === value) return true;
        }

        // check col, if number is in col return true
        for (let r = 0; r < 9; r++) {
            if (r !== row && userGrid[r][col] === value) return true;
        }

        // check 3x3 box, if number is in box return true
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

    // function applies to number buttons and checks if a number is already complete in the grid (nine instances)
    // it is called on the number buttons whenever the grid re-renders
    const numberFilled = (num) => {
        let count = 0;

        for (let r = 0; r < 9; r++) {
            if (!userGrid[r] || userGrid[r].length !== 9) continue; // added safety (for when the grid hasn't rendered yet)

            for (let c = 0; c < 9; c++) {
                if (userGrid[r][c] === num) count++;
            }
        }

        if (count >= 9) { // disables button when the number is already nine times on the grid
            return true;
        } else {
            return false;
        }
    };

    // return value of SudokuGrid()
    return (
        <div>
            <div className="sudoku-wrapper">
                <div className="sudoku-container">
                    <p className="difficulty-label">Difficulty level: {difficulty}</p>

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
                                                if (grid[rowIndex][colIndex] !== 0) return; // if cell is not prefilled, it can be selected

                                                if (!isSelected) { 
                                                    setSelectedCell({ row: rowIndex, col: colIndex }) // select the cell
                                                } else {
                                                    setSelectedCell(null); // deselect if already selected
                                                }
                                            }}
                                        >
                                            {num !== 0 ? num : ""}
                                        </div>
                                    );
                                })
                            )}
                    </div>

                    <div className="stopwatch">
                        Time: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
                    </div>
                </div>

                <div className="sudoku-numbers">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'DEL'].map((number) => (
                            <button key={number} 
                                    className={`number-button ${numberFilled(number) ? "complete" : ""} ${number === 'DEL' ? "del-button" : ""}`}
                                    disabled={numberFilled(number)}
                                    onClick={() => {
                                        if (!selectedCell) return;
                                        
                                        const row = selectedCell.row;
                                        const col = selectedCell.col;

                                        if (grid[row][col] !== 0) return;

                                        const updatedGrid = userGrid.map(r => [...r]);

                                        if (number === 'DEL') {
                                            updatedGrid[row][col] = 0;
                                        } else {
                                            updatedGrid[row][col] = number;
                                        }

                                        setUserGrid(updatedGrid);
                                    }}
                            >
                                {number}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SudokuGrid;
