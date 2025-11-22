using BankCustomerAPI.DTO;
using BankCustomerAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly TransactionService _transactionService;

        public AccountsController(AccountService accountService, TransactionService transactionService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
        }

        [Authorize]
        [HttpGet("my-accounts")]
        public async Task<IActionResult> GetMyAccounts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst(JwtRegisteredClaimNames.Sub);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("Invalid User ID");

            var accounts = await _accountService.GetAccountsByUserAsync(userId);

            var accountDtos = accounts.Select(a => new AccountDto
            {
                AccountId = a.AccountId,
                BranchId = a.BranchId,
                AccountNumber = a.AccountNumber,
                AccountType = a.AccountType,
                CurrencyCode = a.CurrencyCode,
                Balance = a.Balance,
                IsMinor = a.IsMinor,
                PowerOfAttorneyUserId = a.PowerOfAttorneyUserId,
                IsClosed = a.IsClosed,
                CreatedDate = a.CreatedDate,
                BranchName = a.Branch?.BranchName,
                BankName = a.Branch?.Bank?.BankName
            }).ToList();

            return Ok(accountDtos);
        }

        [Authorize]
        [HttpPost("{accountId}/deposit")]
        public async Task<IActionResult> Deposit(int accountId, [FromBody] TransactionDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub));

            var success = await _accountService.DepositAsync(accountId, dto.Amount);
            if (!success) return BadRequest("Deposit failed.");

            await _transactionService.DepositAsync(accountId, dto.Amount, userId);

            return Ok(new { Message = "Deposit successful", accountId, dto.Amount });
        }

        [Authorize]
        [HttpPost("{accountId}/withdraw")]
        public async Task<IActionResult> Withdraw(int accountId, [FromBody] TransactionDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub));

            var success = await _accountService.WithdrawAsync(accountId, dto.Amount);
            if (!success) return BadRequest("Withdrawal failed. Check balance.");

            await _transactionService.WithdrawAsync(accountId, dto.Amount, userId);

            return Ok(new { Message = "Withdrawal successful", accountId, dto.Amount });
        }

        [Authorize]
        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] TransferDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub));

            var success = await _accountService.TransferAsync(dto.FromAccountId, dto.ToAccountId, dto.Amount);
            if (!success) return BadRequest("Transfer failed. Check balances or account IDs.");

            await _transactionService.TransferAsync(dto.FromAccountId, dto.ToAccountId, dto.Amount, userId);

            return Ok(new { Message = "Transfer successful", dto.FromAccountId, dto.ToAccountId, dto.Amount });
        }
    }
}
