using System;
using KompaerjonBackend.Business.Models;

namespace KompaerjonBackend.Business.Services.Models
{
    public class ComparisonDto
    {
        public ComparisonDto(Guid id, Guid userId, DateTime created, DateTime? updated, string searchScheme, string name, string description, bool hasShares)
        {
            Id = id;
            UserId = userId;
            Created = created;
            Updated = updated;
            SearchScheme = searchScheme;
            Name = name;
            Description = description;
            HasShares = hasShares;
        }

        public Guid Id { get; }
        public Guid UserId { get; }
        public DateTime Created { get; }
        public DateTime? Updated { get; }
        public string Name { get; }
        public string Description { get; }
        public bool HasShares { get; }
        public string SearchScheme { get; }

        internal static ComparisonDto From(Comparison comparison, bool hasShares)
        {
            return new ComparisonDto(comparison.Id, comparison.UserId, comparison.Created, comparison.Updated,
                comparison.SearchScheme, comparison.Name, comparison.Description, hasShares);
        }
    }
}