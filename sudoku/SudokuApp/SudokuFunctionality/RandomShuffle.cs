namespace SudokuApp.SudokuFunctionality;

public class RandomShuffle
{
    public static void ShuffleArray(int[] array)
    {
        Random rand = new Random(); // create a single Random instance

        for (int i = array.Length - 1; i > 0; i--)
        {
            int j = rand.Next(0, i + 1); // pick a random index between 0 and i

            // swap elements at i and j
            (array[i], array[j]) = (array[j], array[i]);
        }
    }
}