using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KompaerjonBackend.Business.Commands;
using KompaerjonBackend.Business.Events;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KompaerjonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        private readonly UserService userService;

        public PublicController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserRegistered>> PostRegister(RegisterUser registerUser)
        {
            var name = string.IsNullOrWhiteSpace(registerUser.Name) ? registerUser.Email : registerUser.Name;
            var userRegistered = await this.userService.RegisterAsync(registerUser.Name, registerUser.Email, registerUser.Password);
            return CreatedAtAction(nameof(PostRegister), new { id = userRegistered.UserId }, userRegistered);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoggedIn>> PostLogin(LoginUser loginUser)
        {
            var userLoggedIn = await this.userService.LoginAsync(loginUser.Email, loginUser.Password);
            return CreatedAtAction(nameof(PostLogin), new { id = userLoggedIn.UserId }, userLoggedIn);
        }
    }
}
