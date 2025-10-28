using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Permission", Schema = "training")]
    public class Permission : AuditableEntity
    {
        [Key]
        public int PermissionId { get; set; }

        [Required, MaxLength(100)]
        public string PermissionName { get; set; } = string.Empty;

        public ICollection<RolePermission>? RolePermissions { get; set; }
    }
}
