using System;
using KompaerjonBackend.Business.Models;

namespace KompaerjonBackend.Business.Services.Models
{
    public class ComparisonDetailDto : ComparisonDto
    {
        public ComparisonDetailDto(Guid id, Guid userId, DateTime created, DateTime? updated, string searchScheme,
            string name, string description, AttributeDto[] attributes, EntryDto[] entries, ShareDto[] shares)
            : base(id, userId, created, updated, searchScheme, name, description, shares.Any())
        {
            Attributes = attributes;
            Entries = entries;
            Shares = shares;
        }

        public AttributeDto[] Attributes { get; }
        public EntryDto[] Entries { get; }
        public ShareDto[] Shares { get; }

        internal static ComparisonDetailDto From(Comparison comparison,
            ComparisonAttribute[] attributes, ComparisonEntry[] entries, ComparisonShare[] shares)
        {
            var attributeDtos = attributes.Select(x => AttributeDto.From(x)).ToArray();
            var entryDtos = entries.Select(x => EntryDto.From(x)).ToArray();
            var shareDtos = shares.Select(x => ShareDto.From(x)).ToArray();
            return new ComparisonDetailDto(comparison.Id, comparison.UserId, comparison.Created, comparison.Updated,
                comparison.SearchScheme, comparison.Name, comparison.Description, attributeDtos, entryDtos, shareDtos);
        }


        public class ShareDto
        {
            public ShareDto(Guid id, DateTime created, DateTime? updated, string name, DateOnly expires, DateTime? lastAccess, string email)
            {
                Id = id;
                Created = created;
                Updated = updated;
                Name = name;
                Expires = expires;
                LastAccess = lastAccess;
                Email = email;
            }

            public Guid Id { get; }
            public DateTime Created { get; }
            public DateTime? Updated { get; }
            public string Name { get; }
            public DateOnly Expires { get; }
            public DateTime? LastAccess { get; }
            public string Email { get; }

            internal static ShareDto From(ComparisonShare share)
            {
                return new ShareDto(share.Id, share.Created, share.Updated, share.Name, share.Expires, share.LastAccess, share.Email);
            }
        }

        public class EntryDto
        {
            public EntryDto(Guid id, DateTime created, DateTime? updated, string name, string url, decimal price, int ratingPoints, string comment)
            {
                Id = id;
                Created = created;
                Updated = updated;
                Name = name;
                Url = url;
                Price = price;
                RatingPoints = ratingPoints;
                Comment = comment;
            }

            public Guid Id { get; }
            public DateTime Created { get; }
            public DateTime? Updated { get; }
            public string Name { get; }
            public string Url { get; }
            public decimal Price { get; }
            public int RatingPoints { get; }
            public string Comment { get; }

            internal static EntryDto From(ComparisonEntry entry)
            {
                return new EntryDto(entry.Id, entry.Created, entry.Updated, entry.Name, entry.Url, entry.Price, entry.RatingPoints, entry.Comment);
            }
        }

        public class AttributeDto
        {
            public AttributeDto(Guid id, DateTime created, DateTime? updated, string name, string key, string searchWords)
            {
                Id = id;
                Created = created;
                Updated = updated;
                Name = name;
                Key = key;
                SearchWords = searchWords;
            }

            public Guid Id { get; }
            public DateTime Created { get; }
            public DateTime? Updated { get; }
            public string Name { get; }
            public string Key { get; }
            public string SearchWords { get; }

            internal static AttributeDto From(ComparisonAttribute attribute)
            {
                return new AttributeDto(attribute.Id, attribute.Created, attribute.Updated, attribute.Name, attribute.Key, attribute.SearchWords);
            }
        }
    }
}

