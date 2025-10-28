using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("RolePermission", Schema = "training")]
    public class RolePermission
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Role? Role { get; set; }

        [ForeignKey(nameof(PermissionId))]
        public Permission? Permission { get; set; }
    }
}
