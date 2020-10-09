using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Invoice
{
    public class MvInvoice
    {
        [Required]
        public int invoiceId { get; set; }
    }
}
