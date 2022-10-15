namespace KompaerjonBackend.Business.Models
{
    public class ComparisonEntryCheck
    {

        public Guid Id { get; set; }

        public Guid ComparisonEntryId { get; set; }

        public ComparisonEntry ComparisonEntry { get; set; }

        public Guid ComparisonAttributeId { get; set; }

        public ComparisonAttribute ComparisonAttribute { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public string Comment { get; set; }

        public decimal AdditionalCosts { get; set; }

        public bool State { get; set; }

        public string Value { get; set; }
    }
}