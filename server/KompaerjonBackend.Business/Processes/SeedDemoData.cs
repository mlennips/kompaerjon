using System;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services;

namespace KompaerjonBackend.Business.Processes
{
    public class SeedDemoData
    {
        private readonly DataContext dataContext;
        private readonly UserService userService;
        private readonly ComparisonService comparisonService;

        public SeedDemoData(DataContext dataContext)
        {
            this.dataContext = dataContext;
            this.userService = new UserService(dataContext);
            this.comparisonService = new ComparisonService(dataContext);
        }

        public void Start()
        {
            if (!this.dataContext.Users.Any())
            {
                var demoUser = this.userService.AddAsync("Demo", "demo@lennips.de", "Demo%1234").Result;
                var comparisonNames = new string[] { "Wohnung 2017", "Auto 2018", "Haus 2020", "Auto 2022" };

                foreach (var comparisonName in comparisonNames)
                {
                    var comparison = this.comparisonService.AddAsync(demoUser.Id, comparisonName,
                        $"Dieser Vergleich wurde am {DateTime.Now.ToLongDateString()} erstellt.", "car").Result;

                    string[] urls = {
                        "https://suchen.mobile.de/fahrzeuge/details.html?id=353446916&action=parkItem",
                        "https://suchen.mobile.de/fahrzeuge/details.html?id=348892272&action=parkItem",
                        "https://suchen.mobile.de/fahrzeuge/details.html?id=353446138&action=parkItem",
                        "https://suchen.mobile.de/fahrzeuge/details.html?id=339522930&action=parkItem"
                    };
                    var entries = this.comparisonService.AddEntriesToComparison(comparison.Id, urls).Result;
                }
            }
        }
    }
}

