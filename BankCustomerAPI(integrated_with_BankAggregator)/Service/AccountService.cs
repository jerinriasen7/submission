using BankCustomerAPI.Data;
using BankCustomerAPI.DTO;
using BankCustomerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Service
{
    public class AccountService
    {
        private readonly BankingDbContext _context;

        public AccountService(BankingDbContext context)
        {
            _context = context;
        }

        // List user accounts
        public async Task<List<Account>> GetAccountsByUserAsync(int userId)
        {
            return await _context.Accounts
                .Where(a => a.UserId == userId && !a.IsClosed)
                .Include(a => a.Branch)
                    .ThenInclude(b => b.Bank)
                .ToListAsync();
        }

        // Deposit
        public async Task<bool> DepositAsync(int accountId, decimal amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null || account.IsClosed) return false;

            account.Balance += amount;
            _context.Accounts.Update(account);
            await _context.SaveChangesAsync();
            return true;
        }

        // Withdraw
        public async Task<bool> WithdrawAsync(int accountId, decimal amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null || account.IsClosed || account.Balance < amount) return false;

            account.Balance -= amount;
            _context.Accounts.Update(account);
            await _context.SaveChangesAsync();
            return true;
        }

        // Transfer
        public async Task<bool> TransferAsync(int fromAccountId, int toAccountId, decimal amount)
        {
            if (fromAccountId == toAccountId) return false;

            var fromAccount = await _context.Accounts.FindAsync(fromAccountId);
            var toAccount = await _context.Accounts.FindAsync(toAccountId);

            if (fromAccount == null || toAccount == null) return false;
            if (fromAccount.IsClosed || toAccount.IsClosed) return false;
            if (fromAccount.Balance < amount) return false;

            fromAccount.Balance -= amount;
            toAccount.Balance += amount;

            _context.Accounts.Update(fromAccount);
            _context.Accounts.Update(toAccount);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
