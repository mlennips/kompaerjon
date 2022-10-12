using System;
namespace KompaerjonBackend.Business.Events
{
    public class UserLoggedIn
    {
        public UserLoggedIn(Guid userId, string name, string email, string token)
        {
            UserId = userId;
            Name = name;
            Email = email;
            Token = token;
        }

        public Guid UserId { get; }
        public string Name { get; }
        public string Email { get; }
        public string Token { get; }
    }
}

