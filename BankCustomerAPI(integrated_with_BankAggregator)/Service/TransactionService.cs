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
            var txn = new Transaction
            {
                AccountId = accountId,
                UserId = userId,
                Amount = amount,
                Type = "Deposit",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = null,
                ToAccount = "Account " + accountId
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }


        // Log Withdraw transaction
        public async Task<Transaction> WithdrawAsync(int accountId, decimal amount, int userId)
        {
            var txn = new Transaction
            {
                AccountId = accountId,
                UserId = userId,
                Amount = amount,
                Type = "Withdraw",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = "Account " + accountId,
                ToAccount = null
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }

        // Log Transfer transaction (from source account perspective)
        public async Task<Transaction> TransferAsync(int fromAccountId, int toAccountId, decimal amount, int userId)
        {
            var txn = new Transaction
            {
                AccountId = fromAccountId,
                UserId = userId,
                Amount = amount,
                Type = "Transfer",
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                FromAccount = fromAccountId.ToString(),
                ToAccount = toAccountId.ToString()
            };

            _context.Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return txn;
        }

    }
}

