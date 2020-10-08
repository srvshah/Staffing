using Microsoft.AspNetCore.Mvc;
using Staffing.Application.Service.Transaction;
using Staffing.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Staffing.Application.WebApi.Areas.Transaction
{
    public class TransactionController : BaseController
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public IActionResult GetAllTransactions()
        {
            try
            {
                var jsonString = _transactionService.GetAllTransactions();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
