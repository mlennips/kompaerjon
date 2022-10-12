using System;
using KompaerjonBackend.Business.Models;
using Microsoft.EntityFrameworkCore;
using static KompaerjonBackend.Business.Core.Exceptions;

namespace KompaerjonBackend.Business.Services
{
    public class ComparisonService
    {
        private readonly DataContext dataContext;

        public ComparisonService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<Comparison> AddAsync(Guid userId, string name, string description, string searchScheme)
        {
            var user = await dataContext.Users.FindAsync(userId);
            if (user == null)
            {
                throw new NotFoundException<User>(userId);
            }
            var comparison = Comparison.Create(Guid.NewGuid(), user, name, description, searchScheme);
            await this.dataContext.Comparisons.AddAsync(comparison);
            await this.dataContext.SaveChangesAsync();
            return comparison;
        }

        public async Task<ComparisonEntry[]> AddEntriesToComparison(Guid comparisonId, string[] urls)
        {
            var entries = new List<ComparisonEntry>();
            foreach (var url in urls)
            {
                var entry = await this.AddEntryToComparisonAsync(comparisonId, url, url);
            }
            return entries.ToArray();
        }

        public async Task<ComparisonEntry> AddEntryToComparisonAsync(Guid comparisonId, string name, string url)
        {
            var comparison = await this.dataContext.Comparisons.FindAsync(comparisonId);
            if (comparison == null)
            {
                throw new NotFoundException<Comparison>(comparisonId);
            }
            var entry = ComparisonEntry.Create(Guid.NewGuid(), comparison, name, url);
            await this.dataContext.ComparisonEntries.AddAsync(entry);
            await this.dataContext.SaveChangesAsync();
            return entry;
        }

        public async Task<Comparison> GetAsync(Guid id)
        {
            var comparison = await this.dataContext.Comparisons.FindAsync(id);
            if (comparison == null)
            {
                throw new NotFoundException<Comparison>(id);
            }
            return comparison;
        }

        public async Task<Comparison[]> GetForUserAsync(Guid userId)
        {
            return await this.dataContext.Comparisons
                .Where(x => x.User.Id == userId)
                .ToArrayAsync();
        }
    }
}

