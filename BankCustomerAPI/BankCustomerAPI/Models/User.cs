using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("User", Schema = "training")]
    public class User : AuditableEntity
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required, MaxLength(20)]
        public string UserType { get; set; } = "Normal";

        public bool IsDeleted { get; set; } = false;

        // Navigation Properties
        public ICollection<Account>? Accounts { get; set; }
        public ICollection<Account>? PowerOfAttorneyAccounts { get; set; }
        public ICollection<UserRole>? UserRoles { get; set; }
    }
}
