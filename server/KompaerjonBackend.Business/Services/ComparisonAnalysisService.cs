using System;
using System.Net;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services.Models;
using Microsoft.EntityFrameworkCore;

namespace KompaerjonBackend.Business.Services
{
    public class ComparisonAnalysisService
    {
        private readonly DataContext dataContext;

        public ComparisonAnalysisService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<ComparisonAnalysisDto> BuildAsync(Guid comparisonId)
        {
            var result = new ComparisonAnalysisDto(comparisonId);
            var comparison = await this.dataContext.Comparisons
                .Include(x => x.Attributes)
                .Include(x => x.Entries)
                .Where(x => x.Id == comparisonId)
                .FirstAsync();

            var attributes = comparison.Attributes.ToList();
            var entries = comparison.Entries.ToList();

            foreach (var entry in entries)
            {
                if (!string.IsNullOrWhiteSpace(entry.Url))
                {
                //https://html-agility-pack.net/knowledge-base/36663581/httpclient-doesn-t-get-full-website-html-source
                //https://stackoverflow.com/questions/24288726/scraping-webpage-generated-by-javascript-with-c-sharp/24289395#24289395
                //HTML händisch kopieren und einfügen       
                }
            }


            return result;
        }
    }
}

