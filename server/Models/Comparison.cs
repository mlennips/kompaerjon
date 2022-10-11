using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KompaerjonApi.Models
{
    public class Comparison
    {
        [Key]
        public Guid Id { get; set; }

        //public User user = models.ForeignKey(User, on_delete: models.CASCADE);

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
            
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string SearchScheme { get; set; }

        [ForeignKey("Attributes")]
        public virtual ICollection<ComparisonAttribute> Attributes { get; set; }

        [ForeignKey("Entries")]
        public virtual ICollection<ComparisonEntry> Entries { get; set; }

        [ForeignKey("Shares")]
        public virtual ICollection<ComparisonShare> Shares { get; set; }
    }
}