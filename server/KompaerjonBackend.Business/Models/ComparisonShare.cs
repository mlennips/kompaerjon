using System.ComponentModel.DataAnnotations;

namespace KompaerjonBackend.Business.Models
{
    public class ComparisonShare
    {
        public Guid Id { get; set; }

        public Guid ComparisonId { get; set; }

        public Comparison Comparison { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        [Required]
        public string Name { get; set; }

        public string Email { get; set; }

        public DateTime? LastAccess { get; set; }

        public DateOnly Expires { get; set; }
    }
}