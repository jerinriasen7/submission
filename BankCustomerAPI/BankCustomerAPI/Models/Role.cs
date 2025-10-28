using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Role", Schema = "training")]
    public class Role : AuditableEntity
    {
        [Key]
        public int RoleId { get; set; }

        [Required, MaxLength(50)]
        public string RoleName { get; set; } = string.Empty;

        public ICollection<UserRole>? UserRoles { get; set; }
        public ICollection<RolePermission>? RolePermissions { get; set; }
    }
}
