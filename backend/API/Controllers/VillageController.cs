using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VillageController : ControllerBase
    {
        private readonly VillageContext _context;

        public VillageController(VillageContext context)
        {
            _context = context;
        }

        // GET: api/Village
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Village>>> GetVillages()
        {
          if (_context.Villages == null)
          {
              return NotFound();
          }
          if (_context.Villages.Count() == 0)
            {
                return Ok("zero villages");
            }
            var villages = await _context.Villages.Include(v => v.Amenities).ToListAsync();

            return villages;
        }

        // GET: api/Village/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Village>> GetVillage(long id)
        {
          if (_context.Villages == null)
          {
              return NotFound();
          }
            var village = await _context.Villages.Include(v => v.Amenities).FirstOrDefaultAsync(v => v.id == id);

            if (village == null)
            {
                return NotFound();
            }


            return village;
        }

        // PUT: api/Village/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVillage(long id, Village village)
        {
            if (id != village.id)
            {
                return BadRequest();
            }

            _context.Entry(village).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VillageExists(id))
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

        // POST: api/Village
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Village>> PostVillage(Village village)
        {
            if (_context.Villages == null)
            {
                return Problem("Entity set 'VillageContext.Villages'  is null.");
            }
          
            _context.Villages.Add(village);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVillage", new { id = village.id }, village);
        }

        // DELETE: api/Village/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVillage(long id)
        {
            if (_context.Villages == null)
            {
                return NotFound();
            }
            var village = await _context.Villages.FindAsync(id);
            if (village == null)
            {
                return NotFound();
            }

            _context.Villages.Remove(village);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VillageExists(long id)
        {
            return (_context.Villages?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
