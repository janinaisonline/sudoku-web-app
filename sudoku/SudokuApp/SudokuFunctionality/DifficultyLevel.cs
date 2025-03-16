using SudokuApp.SudokuFunctionality;

namespace SudokuApp.Difficulty;

public class DifficultyLevel
{
    private int[,] fullGrid;

    public DifficultyLevel()
    {
        SudokuGenerator generator = new SudokuGenerator();
        fullGrid = generator.GeneratePuzzle();
    }

    public int[,] EasyPuzzle()
    {
        return RemoveEntries(fullGrid, 30);
    }

    public int[,] MediumPuzzle()
    {
        return RemoveEntries(fullGrid, 40);
    }

    public int[,] HardPuzzle()
    {
        return RemoveEntries(fullGrid, 50);
    }

    public int[,] RemoveEntries(int[,] grid, int count)
    {
        var puzzle = (int[,])grid.Clone();
        Random rand = new Random();
        int removed = 0;

        while (removed < count)
        {
            int row = rand.Next(9);
            int col = rand.Next(9);

            if (puzzle[row, col] != 0)
            {
                puzzle[row, col] = 0;
                removed++;
            }
        }

        return puzzle;
    }
}