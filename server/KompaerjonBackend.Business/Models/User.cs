using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace KompaerjonBackend.Business.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [IgnoreDataMember]
        public string Password { get; set; }

        public DateTime? LastLogin { get; set; }

        public virtual ICollection<Comparison> Comparisons { get; set; }

        internal static User Create(Guid id, string name, string email, string password)
        {
            return new User()
            {
                Id = id,
                Created = DateTime.UtcNow,
                Name = name,
                Email = email,
                Password = password
            };
        }

        internal void Login()
        {
            this.Updated = DateTime.UtcNow;
            this.LastLogin = DateTime.UtcNow;
        }
    }
}

