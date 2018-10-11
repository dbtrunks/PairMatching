using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using PairMatching.Data;

namespace PairMatching.Pages
{
    public class IndexModel : PageModel
    {
        private readonly MyContext _db;

        public IndexModel(MyContext db)
        {
            _db = db;
        }

        [BindProperty]
        public int Select { get; set; }
        public List<SelectListItem> SelectList { get; set; }
        private readonly List<int> listPairs = new List<int> { 4, 6, 8, 10 };

        public int[,] Pairs { get; set; }

        public void OnGet(int id = 4)
        {
            Select = listPairs.Aggregate((x, y) => Math.Abs(x - id) < Math.Abs(y - id) ? x : y); ;
            SelectList = new List<SelectListItem>();
            foreach (var p in listPairs)
            {
                SelectList.Add(new SelectListItem { Value = $"{p}", Text = $"{p}x{p}" });
            }
            GetPairs(Select);
            HttpContext.Session.SetObjectAsJson("Select", Select);
            HttpContext.Session.SetObjectAsJson("Pairs", Pairs);
        }

        public JsonResult OnPost(string element)
        {
            element = element.Replace("\"", "");
            var temp = element.Split(",");
            int i = Convert.ToInt32(temp[0].ToString());
            int j = Convert.ToInt32(temp[temp.Length - 1].ToString());
            Pairs = HttpContext.Session.GetObjectFromJson<int[,]>("Pairs");
            if (Pairs != null)
            {
                return new JsonResult(Pairs[i, j]);
            }
            else
            {
                return new JsonResult(0);
            }
        }

        public async Task<IActionResult> OnPostSaveScoreAsync(string nick, TimeSpan time)
        {
            if (!string.IsNullOrEmpty(nick))
            {
                string select = HttpContext.Session.GetObjectFromJson<int>("Select").ToString();
                Score score = new Score { Name = nick, Time = time, Pairs = $"{select}x{select}" };
                _db.Top.Add(score);
                await _db.SaveChangesAsync();
            }
            return RedirectToPage("/Index");
        }

        private void GetPairs(int pairsNumber)
        {
            var array = new int[pairsNumber, pairsNumber];
            int elements = pairsNumber * pairsNumber;
            int[] numbers = new int[elements];
            var tmp = Enumerable.Range(1, elements / 2).ToArray();
            tmp.CopyTo(numbers, 0);
            tmp.CopyTo(numbers, (elements) / 2);


            Random rnd = new Random();
            numbers = numbers.OrderBy(x => rnd.Next()).ToArray();
            int n = 0;
            for (int i = 0; i < pairsNumber; ++i)
                for (int j = 0; j < pairsNumber; ++j)
                    array[i, j] = numbers[n++];

            Pairs = array;
        }
    }
}
