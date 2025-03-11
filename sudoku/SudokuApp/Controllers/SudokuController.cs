using Microsoft.AspNetCore.Mvc;
using SudokuApp.SudokuFunctionality;
using System.Collections.Generic;  // ✅ Required for List<T>

namespace SudokuApp.Controllers
{
    [ApiController]
    [Route("api/sudoku")]
    public class SudokuController : ControllerBase
    {
        private readonly SudokuGenerator _sudokuGenerator;

        public SudokuController()
        {
            _sudokuGenerator = new SudokuGenerator();
        }

        [HttpGet("generate")]
        public IActionResult GenerateSudoku()
        {
            var puzzle = _sudokuGenerator.GeneratePuzzle();
            _sudokuGenerator.FillPuzzle(puzzle);

            // ✅ Convert `int[,]` to `List<List<int>>`
            var convertedGrid = ConvertToList(puzzle);

            return Ok(new { grid = convertedGrid });
        }

        // 🔹 Helper function to convert 2D array to List<List<int>>
        private List<List<int>> ConvertToList(int[,] grid)
        {
            var result = new List<List<int>>();

            for (int i = 0; i < grid.GetLength(0); i++)
            {
                var row = new List<int>();
                for (int j = 0; j < grid.GetLength(1); j++)
                {
                    row.Add(grid[i, j]);
                }
                result.Add(row);
            }
            return result;
        }
    }
}


// using Microsoft.AspNetCore.Mvc;
// using SudokuApp.SudokuFunctionality;

// namespace SudokuApp.Controllers
// {
//     [ApiController]
//     [Route("api/sudoku")]
//     public class SudokuController : ControllerBase
//     {
//         private readonly SudokuGenerator _sudokuGenerator;

//         public SudokuController()
//         {
//             _sudokuGenerator = new SudokuGenerator();
//         }

//         [HttpGet("generate")]
//         public IActionResult GenerateSudoku()
//         {
//             var puzzle = _sudokuGenerator.GeneratePuzzle();
//             _sudokuGenerator.FillPuzzle(puzzle);
//             return Ok(new { grid = puzzle });
//         }
//     }
// }
