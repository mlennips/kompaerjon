using System;
namespace KompaerjonBackend.Business.Events
{
    public class UserLoggedIn
    {
        public UserLoggedIn(Guid userId, string name, string email, string token, DateTime expiresAt)
        {
            UserId = userId;
            Name = name;
            Email = email;
            Token = token;
            ExpiresAt = expiresAt;
        }

        public Guid UserId { get; }
        public string Name { get; }
        public string Email { get; }
        public string Token { get; }
        public DateTime ExpiresAt { get; }
    }
}

