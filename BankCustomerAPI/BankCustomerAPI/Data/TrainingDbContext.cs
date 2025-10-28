using BankCustomerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BankCustomerAPI.Data
{
    public class TrainingDbContext : DbContext
    {
        public TrainingDbContext(DbContextOptions<TrainingDbContext> options)
            : base(options)
        {
        }

        // DbSets (Tables)
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Account> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Apply default schema for all tables
            modelBuilder.HasDefaultSchema("training");

            // Configure composite keys
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            // Relationships
            modelBuilder.Entity<Branch>()
                .HasOne(b => b.Bank)
                .WithMany(bk => bk.Branches)
                .HasForeignKey(b => b.BankId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Accounts)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.PowerOfAttorneyUser)
                .WithMany(u => u.PowerOfAttorneyAccounts)
                .HasForeignKey(a => a.PowerOfAttorneyUserId)
                .OnDelete(DeleteBehavior.Restrict);
            // Decimal precision for Account fields
            modelBuilder.Entity<Account>()
                .Property(a => a.Balance)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Account>()
                .Property(a => a.InterestRate)
                .HasPrecision(5, 2);

            base.OnModelCreating(modelBuilder);
        }

        // Auto-audit save tracking (optional)
        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is AuditableEntity &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var entity = (AuditableEntity)entry.Entity;
                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = DateTime.UtcNow;
                    entity.CreatedBy ??= "system";
                }
                else if (entry.State == EntityState.Modified)
                {
                    entity.UpdatedDate = DateTime.UtcNow;
                    entity.UpdatedBy ??= "system";
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
