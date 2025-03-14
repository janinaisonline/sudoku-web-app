import SudokuGrid from "./SudokuGrid";

function SudokuGame() {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Sudoku Player</h1>
            <SudokuGrid />
        </div>
    );
}

export default SudokuGame;