using System;
namespace KompaerjonBackend.Business.Core
{
    public class Exceptions
    {
        public class NotFoundException<TEntity> : DomainException
        {
            public NotFoundException(Guid id)
                : base($"{typeof(TEntity).Name} mit der Id '{id}' wurde nicht gefunden.")
            {
            }
        }

        public class DomainException : Exception
        {
            public DomainException(string message)
                : base(message)
            {
            }
        }
    }
}

