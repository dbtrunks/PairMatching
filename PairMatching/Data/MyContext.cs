using Microsoft.EntityFrameworkCore;
using PairMatching.Pages;

namespace PairMatching.Data
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<Score> Top { get; set; }
    }
}
