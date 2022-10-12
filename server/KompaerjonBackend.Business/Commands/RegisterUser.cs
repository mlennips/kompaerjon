using System;
namespace KompaerjonBackend.Business.Commands
{
    public class RegisterUser
    {
        public RegisterUser(string name, string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException($"\"{nameof(email)}\" darf nicht NULL oder ein Leerraumzeichen sein.", nameof(email));
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException($"\"{nameof(password)}\" darf nicht NULL oder ein Leerraumzeichen sein.", nameof(password));
            }

            Name = name;
            Email = email;
            Password = password;
        }
        public string Name { get; }
        public string Email { get; }
        public string Password { get; }
    }
}

