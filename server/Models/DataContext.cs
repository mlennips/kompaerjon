using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace KompaerjonApi.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Comparison> Comparisons { get; set; } = null!;
        public DbSet<ComparisonAttribute> ComparisonAttributes { get; set; } = null!;
        public DbSet<ComparisonEntry> ComparisonEntries { get; set; } = null!;
        public DbSet<ComparisonEntryCheck> ComparisonEntryChecks { get; set; } = null!;
        public DbSet<ComparisonShare> ComparisonShares { get; set; } = null!;
    }
}