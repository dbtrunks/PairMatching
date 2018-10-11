using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PairMatching.Data;

namespace PairMatching.Pages
{
    public class TopModel : PageModel
    {
        private readonly MyContext _db;

        public TopModel(MyContext db)
        {
            _db = db;
        }

        [BindProperty]
        public List<Score> Top { get; set; }

        public void OnGet()
        {
            Top = _db.Top.OrderByDescending(t => t.Pairs.Replace("x", "").PadLeft(4,'0')).ThenBy(t => t.Time).Take(15).ToList(); 
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _db.Top.Add(Top.First());
            await _db.SaveChangesAsync();
            return RedirectToPage("/Index");
        }
    }
}
