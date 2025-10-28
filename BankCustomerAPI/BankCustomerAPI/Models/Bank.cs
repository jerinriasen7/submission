using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Bank", Schema = "training")]
    public class Bank : AuditableEntity
    {
        [Key]
        public int BankId { get; set; }

        [Required, MaxLength(100)]
        public string BankName { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string HeadOfficeAddress { get; set; } = string.Empty;

        [Required, StringLength(11)]
        public string IFSCCode { get; set; } = string.Empty;

        // Relationships
        public ICollection<Branch>? Branches { get; set; }
    }
}
