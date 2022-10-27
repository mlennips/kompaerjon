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
                    using var httpHandler = new HttpClientHandler();
                    httpHandler.UseDefaultCredentials = true;
                    httpHandler.UseProxy = true;
                    httpHandler.AllowAutoRedirect = true;
                    httpHandler.AutomaticDecompression = DecompressionMethods.All;
                    CookieContainer cookieJar = new();
                    httpHandler.CookieContainer = cookieJar;
                    using var client = new HttpClient(httpHandler);
                    client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15");
                    var httpResponse = await client.GetAsync(entry.Url);
                    var content = await httpResponse.Content.ReadAsStringAsync();
                //HttpWebRequest request = (HttpWebRequest)WebRequest.Create(entry.Url);
                //request.CookieContainer = cookieJar;
                //request.Accept = @"text/html, application/xhtml+xml, */*";
                //request.Referer = @"https://www.mobile.de/";
                //request.Headers.Add("Accept-Language", "de-DE");
                //request.UserAgent = @"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)";
                //request.Host = @"www.mobile.de";
                //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                //String htmlString;
                //using (var reader = new StreamReader(response.GetResponseStream()))
                //{
                //    htmlString = reader.ReadToEnd();
                //}
                //https://html-agility-pack.net/knowledge-base/36663581/httpclient-doesn-t-get-full-website-html-source
                //https://stackoverflow.com/questions/24288726/scraping-webpage-generated-by-javascript-with-c-sharp/24289395#24289395
                //HTML händisch kopieren und einfügen
                //ode client-seitig
                //https://stackoverflow.com/questions/926916/how-to-get-the-bodys-content-of-an-iframe-in-javascript
                }
            }


            return result;
        }
    }
}

