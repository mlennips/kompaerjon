using System;
using System.Xml.Linq;
using KompaerjonBackend.Business.Core;
using KompaerjonBackend.Business.Events;
using KompaerjonBackend.Business.Models;
using KompearjonBackend.Core;
using Microsoft.EntityFrameworkCore;
using static KompaerjonBackend.Business.Core.Exceptions;

namespace KompaerjonBackend.Business.Services
{
    public class UserService
    {
        private readonly DataContext context;

        public UserService(DataContext context)
        {
            this.context = context;
        }

        public async Task<UserRegistered> RegisterAsync(string name, string email, string password)
        {
            var user = await this.AddAsync(name, email, password);
            return new UserRegistered(user.Id, user.Name, user.Email);
        }

        public async Task<User> AddAsync(string name, string email, string password)
        {
            this.ValidateEmail(email);
            var alreadyExists = await this.context.Users.AnyAsync(u => u.Email == email);
            if (alreadyExists)
            {
                throw new DomainException("Benutzer existiert bereits");
            }
            var user = User.Create(Guid.NewGuid(), name, email, password);
            await this.context.Users.AddAsync(user);
            await this.context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> CheckCredentialsAsync(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                throw new DomainException("Zugangsdaten ungültig");
            }
            return await this.context.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public async Task UpdateLoginAsync(Guid id)
        {
            var user = await this.GetAsync(id);
            user.Login();
            await this.context.SaveChangesAsync();
        }

        public async Task<User> GetAsync(Guid id)
        {
            var user = await this.context.Users.FindAsync(id);
            if (user == null)
            {
                throw new DomainException("Benutzer nicht gefunden");
            }
            return user;
        }

        private void ValidateEmail(string email)
        {
            if (!ValidationHelper.CheckEmail(email))
            {
                throw new DomainException("Email invalid");
            }
        }

    }
}

