using System;
using System.ComponentModel.DataAnnotations;

namespace PairMatching.Data
{
    public class Score
    {
        [Key]
        public Guid Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        public TimeSpan Time { get; set; }
        public string Pairs { get; set; }
    }
}
