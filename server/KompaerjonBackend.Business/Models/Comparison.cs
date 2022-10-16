using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KompaerjonBackend.Business.Models
{
    public class Comparison
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }
            
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string SearchScheme { get; set; }

        public virtual ICollection<ComparisonAttribute> Attributes { get; set; }

        public virtual ICollection<ComparisonEntry> Entries { get; set; }

        public virtual ICollection<ComparisonShare> Shares { get; set; }

        static internal Comparison Create(Guid id, Guid userId, string name, string description, string searchScheme)
        {
            return new Comparison()
            {
                Id = id,
                UserId = userId,
                Created = DateTime.UtcNow,
                Name = name,
                Description = description,
                SearchScheme = searchScheme,
                Attributes = new List<ComparisonAttribute>(),
                Entries = new List<ComparisonEntry>(),
                Shares = new List<ComparisonShare>(),
            };
        }
    }
}