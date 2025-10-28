using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Branch", Schema = "training")]
    public class Branch : AuditableEntity
    {
        [Key]
        public int BranchId { get; set; }

        [Required]
        public int BankId { get; set; }

        [Required, MaxLength(100)]
        public string BranchName { get; set; } = string.Empty;

        [Required, StringLength(5)]
        public string BranchCode { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Address { get; set; }

        public int? ManagerUserId { get; set; }

        // Navigation Properties
        [ForeignKey(nameof(BankId))]
        public Bank? Bank { get; set; }

        public ICollection<Account>? Accounts { get; set; }
    }
}
