using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KompaerjonBackend.Business.Models;
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
        private readonly DataContext _context;

        public ComparisonsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Comparisons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comparison>>> GetComparisons()
        {
          if (_context.Comparisons == null)
          {
              return NotFound();
          }
            return await _context.Comparisons.ToListAsync();
        }

        // GET: api/Comparisons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comparison>> GetComparison(Guid id)
        {
          if (_context.Comparisons == null)
          {
              return NotFound();
          }
            var comparison = await _context.Comparisons.FindAsync(id);

            if (comparison == null)
            {
                return NotFound();
            }

            return comparison;
        }

        // PUT: api/Comparisons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComparison(Guid id, Comparison comparison)
        {
            if (id != comparison.Id)
            {
                return BadRequest();
            }

            _context.Entry(comparison).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComparisonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comparisons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comparison>> PostComparison(Comparison comparison)
        {
          if (_context.Comparisons == null)
          {
              return Problem("Entity set 'DataContext.Comparisons'  is null.");
          }
            _context.Comparisons.Add(comparison);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComparison), new { id = comparison.Id }, comparison);
        }

        // DELETE: api/Comparisons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComparison(Guid id)
        {
            if (_context.Comparisons == null)
            {
                return NotFound();
            }
            var comparison = await _context.Comparisons.FindAsync(id);
            if (comparison == null)
            {
                return NotFound();
            }

            _context.Comparisons.Remove(comparison);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComparisonExists(Guid id)
        {
            return (_context.Comparisons?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
