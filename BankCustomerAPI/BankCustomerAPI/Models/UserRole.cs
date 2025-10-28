using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("UserRole", Schema = "training")]
    public class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        // Navigation
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Role? Role { get; set; }
    }
}
