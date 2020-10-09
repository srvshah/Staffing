using Microsoft.AspNetCore.Mvc;
using Staffing.Application.Model.Invoice;
using Staffing.Application.Model.Transaction;
using Staffing.Application.Service.Invoice;
using Staffing.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Staffing.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            try
            {
                var jsonString = _invoiceService.GetAllInvoice();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult AddInvoice([FromBody] IEnumerable<MvTransaction> transactions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _invoiceService.AddInvoice(transactions);
                if (!added)
                {
                    return BadRequest();
                }
                return Ok();


            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public IActionResult GetInvoiceDetail(MvInvoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var jsonString = _invoiceService.GetInvoiceDetail(invoice);
                return Ok(jsonString);
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
