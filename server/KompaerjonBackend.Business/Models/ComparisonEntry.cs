namespace KompaerjonBackend.Business.Models
{
    public class ComparisonEntry
    {
        public Guid Id { get; set; }

        public Guid ComparisonId { get; set; }

        public Comparison Comparison { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        public string Name { get; set; }

        public string Comment { get; set; }

        public string Url { get; set; }

        public decimal Price { get; set; }

        public int RatingPoints { get; set; }

        internal static ComparisonEntry Create(Guid id, Comparison comparison, string name, string url)
        {
            return new ComparisonEntry()
            {
                Id = id,
                Comparison = comparison,
                Created = DateTime.UtcNow,
                Name = name,
                Comment = "",
                Url = url,
                Price = 0,
                RatingPoints = 0
            };
        }
    }
}