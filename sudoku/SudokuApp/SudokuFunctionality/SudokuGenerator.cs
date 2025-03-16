namespace SudokuApp.SudokuFunctionality;

public class SudokuGenerator
{
    private Random rand = new Random();

    int[] allNumbers = {1, 2, 3, 4, 5, 6, 7, 8, 9}; // array with numbers from 1 to 9

    public int[,] GeneratePuzzle()
    {
        var puzzle = new int[9, 9];

        return puzzle;
    }

    public bool FillPuzzle(int[,] puzzle, int row = 0, int col = 0) // row and col initialised with 0 if not passed on (for the first call)
    {
        // move to the next row when reaching the end of a column (when the function is called on a column bigger than 8)
        if (col == 9)
        {
            col = 0;
            row++;
        }

        // if we reach row 9, the puzzle is complete
        if (row == 9)
        {
            return true;
        }

        // skip already filled cells
        if (puzzle[row, col] != 0)
        {
            return FillPuzzle(puzzle, row, col + 1);
        }

        // shuffle numbers to get a random order
        RandomShuffle.ShuffleArray(allNumbers);

        // try placing numbers
        for (int index = 0; index < allNumbers.Length; index++) // iterate through all nine numbers
        {
            int randomNumber = allNumbers[index];

            if (!IsInRow(puzzle, row, col, randomNumber) &&
                !IsInColumn(puzzle, row, col, randomNumber) &&
                !IsInSquare(puzzle, row, col, randomNumber)) // if no conflicts in the sudoku, number gets placed
            {
                puzzle[row, col] = randomNumber; // place number

                // recursively try to solve the rest of the puzzle
                if (FillPuzzle(puzzle, row, col + 1)) // if true (which means every following field gets called until row 9 is reached which returns true)
                {
                    return true; // success, stop searching
                }

                // else backtrack: reset cell if no valid number works (and return false)
                puzzle[row, col] = 0;
            }
        }

        // no valid number found, backtrack to previous call
        return false;
    }

    private bool IsInRow(int[,] puzzle, int row, int col, int number)
    {
        int columns = puzzle.GetLength(1);

        for (int i = 0; i < columns; i++)
        {
            if (i == col) { continue; } // skip field that it is trying to fill

            if (puzzle[row, i] == number)
            {
                return true;
            }
        }

        return false;
    }

    private bool IsInColumn(int[,] puzzle, int row, int col, int number)
    {
        int rows = puzzle.GetLength(0);

        for (int i = 0; i < rows; i++)
        {
            if (i == row) { continue; } // skip field that it is trying to fill

            if (puzzle[i, col] == number)
            {
                return true;
            }
        }

        return false;
    }

    private bool IsInSquare(int[,] puzzle, int row, int col, int number)
    {
        int startRow = row / 3 * 3;
        int startCol = col / 3 * 3;

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (startRow + i == row && startCol + j == col) { continue; } // skip the field that it is trying to fill

                if (puzzle[startRow + i, startCol + j] == number)
                {
                    return true;
                }
            }
        }

        return false;
    }

    public void PrintPuzzle(int[,] puzzle)
    {
        for (int i = 0; i < 9; i++)
        {
            for (int j = 0; j < 9; j++)
            {
                Console.Write(puzzle[i, j] + " ");

                // create vertical lines between smaller 3x3 squares
                if ((j + 1) % 3 == 0 && j != 8)
                {
                    Console.Write("| ");
                }
            }
            Console.WriteLine();  // new line after each row

            if ((i + 1) % 3 == 0 && i != 8)
            {
                Console.WriteLine("---------------------");
            }
        }
    }

    // int rows = puzzle.GetLength(0); // Returns number of rows
    // int columns = puzzle.GetLength(1); // Returns number of columns

}