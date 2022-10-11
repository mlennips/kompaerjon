namespace KompaerjonApi.Models
{
    public class Comparison
    {
        public Guid Id { get; set; }

        //public User user = models.ForeignKey(User, on_delete: models.CASCADE);

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string SearchScheme { get; set; }
    }
}