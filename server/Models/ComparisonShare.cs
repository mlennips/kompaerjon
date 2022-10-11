namespace KompaerjonApi.Models
{
    public class ComparisonShare
    {
        public Guid Id { get; set; }

        public Comparison Comparison { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public string Name { get; set; }

        public DateTime LastAccess { get; set; }

        public DateOnly Expires { get; set; }
    }
}