using BankCustomerAPI.Data;
using BankCustomerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Service
{
    public class TransactionService
    {
        private readonly BankingDbContext _context;

        public TransactionService(BankingDbContext context)
        {
            _context = context;
        }

        // Get all transactions for a specific account
        public async Task<List<Transaction>> GetTransactionsByAccountAsync(int accountId)
        {
            return await _context.Transactions
                .Where(t => t.AccountId == accountId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        // Log Deposit transaction
        public async Task<Transaction> DepositAsync(int accountId, decimal amount, int userId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null) throw new Exception("Account not found");

            var txn = new Transaction
            {
                AccountId = accountId,
                UserId = userId,
                Amount = amount,
                Type = "Deposit",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = null,
                ToAccount = account.AccountNumber
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }

        // Log Withdraw transaction
        public async Task<Transaction> WithdrawAsync(int accountId, decimal amount, int userId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null) throw new Exception("Account not found");

            var txn = new Transaction
            {
                AccountId = accountId,
                UserId = userId,
                Amount = amount,
                Type = "Withdraw",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = account.AccountNumber,
                ToAccount = null
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }

        // Log Transfer transaction (from source account perspective)
        public async Task<Transaction> TransferAsync(int fromAccountId, int toAccountId, decimal amount, int userId)
        {
            var fromAcc = await _context.Accounts.FindAsync(fromAccountId);
            var toAcc = await _context.Accounts.FindAsync(toAccountId);

            if (fromAcc == null || toAcc == null)
                throw new Exception("Account not found");

            var txn = new Transaction
            {
                AccountId = fromAccountId,
                UserId = userId,
                Amount = amount,
                Type = "Transfer",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = fromAcc.AccountNumber,
                ToAccount = toAcc.AccountNumber
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }
    }
}
