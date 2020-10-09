
using Staffing.Application.Model.Invoice;
using Staffing.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic GetAllInvoice();
        bool AddInvoice(IEnumerable<MvTransaction> transactions);
        dynamic GetInvoiceDetail(MvInvoice invoice);
    }
}
