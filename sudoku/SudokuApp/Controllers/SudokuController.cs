using Microsoft.AspNetCore.Mvc;
using SudokuApp.SudokuFunctionality;
using System.Collections.Generic;  // required for List<T>

namespace SudokuApp.Controllers
{
    [ApiController]
    [Route("api/sudoku")] // all http get methods in this file are prefixed with api/sudoku (the declared route)
    public class SudokuController : ControllerBase
    {
        private readonly SudokuGenerator _sudokuGenerator;

        public SudokuController()
        {
            _sudokuGenerator = new SudokuGenerator();
        }

        [HttpGet] // this makes localhost:5099/api/sudoku return something
        public IActionResult DefaultResponse()
        {
            return Ok(new { message = "Welcome to the Sudoku API! Use /api/sudoku/generate to get a puzzle." });
        }

        [HttpGet("generate")] // so when localhost:5099/api/sudoku/generate is called, the following code gets executed and a sudoku is generated
        public IActionResult GenerateSudoku()
        {
            var puzzle = _sudokuGenerator.GeneratePuzzle();
            _sudokuGenerator.FillPuzzle(puzzle);

            // convert `int[,]` to `List<List<int>>`
            var convertedGrid = ConvertToList(puzzle);

            return Ok(new { grid = convertedGrid });
        }

        // helper function to convert 2D array to List<List<int>>
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