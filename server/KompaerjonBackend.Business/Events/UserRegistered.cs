using System;
namespace KompaerjonBackend.Business.Events
{
    public class UserRegistered
    {
        public UserRegistered(Guid userId, string name, string email)
        {
            UserId = userId;
            Name = name;
            Email = email;
        }

        public Guid UserId { get; }
        public string Name { get; }
        public string Email { get; }
    }
}

