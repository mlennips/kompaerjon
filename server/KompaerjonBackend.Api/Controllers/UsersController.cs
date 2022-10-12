using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KompaerjonApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;

        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<User> Get(Guid id)
        {
            return await this.userService.GetAsync(id);
        }

        // PUT: api/Comparisons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(Guid id, User user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //}

        // DELETE: api/Comparisons/5
        //[HttpDelete("{id}")]
        //public Task<IActionResult> Delete(Guid id)
        //{

        //}
    }
}
