using System;
using KompaerjonBackend.Business.Events;
using KompaerjonBackend.Business.Services;
using Microsoft.IdentityModel.Tokens;
using static KompaerjonBackend.Business.Core.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using KompaerjonBackend.Business.Models;
using System.Security.Claims;
using KompaerjonBackend.Infrastructure.Auth;

namespace KompaerjonBackend.Api.Processes
{
    public class AuthenticateUser
    {
        private readonly UserService userService;
        private readonly IConfiguration configuration;

        public AuthenticateUser(UserService userService, IConfiguration configuration)
        {
            this.userService = userService;
            this.configuration = configuration;
        }

        public string StateMessage { get; private set; }
        public bool State { get; private set; }
        public Guid UserId { get; private set; }
        public string UserName { get; private set; }
        public string UserEmail { get; private set; }
        public JwtSecurityToken Token { get; private set; }
        public string EncodedToken { get; private set; }
        public DateTime TokenExpiresAt { get; private set; }

        public async Task StartAsync(string email, string password)
        {
            var user = await this.userService.CheckCredentialsAsync(email, password);
            if (user == null)
            {
                this.StateMessage = "Benutzer und/oder Passwort ungültig";
                this.State = false;
            }
            else
            {
                var token = JwtHelper.CreateToken(this.configuration, user.Id, user.Email);
                await this.userService.UpdateLoginAsync(user.Id);
                this.State = true;
                this.UserId = user.Id;
                this.UserName = user.Name;
                this.UserEmail = user.Email;
                this.Token = token;
                this.EncodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                this.TokenExpiresAt = token.ValidTo;
            }
        }
    }
}