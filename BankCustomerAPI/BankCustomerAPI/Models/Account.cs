using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Account", Schema = "training")]
    public class Account : AuditableEntity
    {
        [Key]
        public int AccountId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int BranchId { get; set; }

        [Required, StringLength(10)]
        public string AccountNumber { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string AccountType { get; set; } = "Savings";

        [Required, StringLength(3)]
        public string CurrencyCode { get; set; } = "INR";

        [Required]
        public decimal Balance { get; set; } = 0.00m;

        public bool IsMinor { get; set; } = false;
        public int? PowerOfAttorneyUserId { get; set; }
        public DateTime? MaturityDate { get; set; }
        public decimal? InterestRate { get; set; }
        public bool IsClosed { get; set; } = false;

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [ForeignKey(nameof(BranchId))]
        public Branch? Branch { get; set; }

        [ForeignKey(nameof(PowerOfAttorneyUserId))]
        public User? PowerOfAttorneyUser { get; set; }
    }
}
