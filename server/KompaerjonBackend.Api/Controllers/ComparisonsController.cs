using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services;
using KompaerjonBackend.Business.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KompaerjonApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ComparisonsController : ControllerBase
    {
        private readonly ComparisonService comparisonService;

        public ComparisonsController(ComparisonService comparisonService)
        {
            this.comparisonService = comparisonService;
        }

        // GET: api/Comparisons
        [HttpGet]
        public async Task<ActionResult<ComparisonDto[]>> GetComparisons(Guid userId)
        {
            if(userId == Guid.Empty)
            {
                BadRequest("UserId required");
            }
            var comparisons = await this.comparisonService.GetForUserAsync(userId);
            return comparisons;
        }

        // GET: api/Comparisons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComparisonDetailDto>> GetComparison(Guid id)
        {
            var comparison = await this.comparisonService.GetAsync(id);
            return comparison;
        }

        // PUT: api/Comparisons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutComparison(Guid id, Comparison comparison)
        //{

        //}

        // POST: api/Comparisons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Comparison>> PostComparison(Comparison comparison)
        //{
        //    return CreatedAtAction(nameof(GetComparison), new { id = comparison.Id }, comparison);
        //}

        // DELETE: api/Comparisons/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteComparison(Guid id)
        //{
        //}
    }
}
