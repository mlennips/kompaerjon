using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KompaerjonBackend.Api.Processes;
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
        private readonly IConfiguration configuration;

        public PublicController(UserService userService, IConfiguration configuration)
        {
            this.userService = userService;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserRegistered>> Register(RegisterUser registerUser)
        {
            var name = string.IsNullOrWhiteSpace(registerUser.Name) ? registerUser.Email : registerUser.Name;
            var userRegistered = await this.userService.RegisterAsync(registerUser.Name, registerUser.Email, registerUser.Password);
            return CreatedAtAction(nameof(Register), new { id = userRegistered.UserId }, userRegistered);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoggedIn>> Login(LoginUser loginUser)
        {
            var authentication = new AuthenticateUser(this.userService, this.configuration);
            await authentication.StartAsync(loginUser.Email, loginUser.Password);
            if (authentication.State)
            {
                var userLoggedIn = new UserLoggedIn(authentication.UserId, authentication.UserName,
                    authentication.UserEmail, authentication.EncodedToken, authentication.TokenValidTo);
                return CreatedAtAction(nameof(Login), new { id = userLoggedIn.UserId }, userLoggedIn);
            }
            else
            {
                return BadRequest(authentication.StateMessage);
            }
        }
    }
}
