using System;
namespace KompaerjonBackend.Business.Commands
{
    public class LoginUser
    {
        public LoginUser(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public string Email { get; }
        public string Password { get; }
    }
}

