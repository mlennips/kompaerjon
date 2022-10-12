namespace KompaerjonBackend.Business.Models
{
    public class ComparisonAttribute
    {
        public Guid Id { get; set; }

        public Comparison Comparison { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public string Key { get; set; }

        public string Name { get; set; }

        public string SearchWords { get; set; }

        public string RatingPoints { get; set; }
    }
}