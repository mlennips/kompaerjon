using System;
namespace KompaerjonBackend.Business.Services.Models
{
    public class ComparisonAnalysisDto
    {
        public ComparisonAnalysisDto(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; }
    }
}

