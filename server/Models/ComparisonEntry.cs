namespace KompaerjonApi.Models
{
    public class ComparisonEntry
    {
        public Guid Id { get; set; }

        public Comparison Comparison { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public string Name { get; set; }

        public string Comment { get; set; }

        public string Url { get; set; }

        public decimal Price { get; set; }

        public int RatingPoints { get; set; }
    }
}