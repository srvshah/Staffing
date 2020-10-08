using Staffing.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Transaction
{
    public interface ITransactionService
    {
        dynamic GetAllTransactions();
        bool AddTransaction(IEnumerable<MvTransactionAdd> assignments);
    }
}
