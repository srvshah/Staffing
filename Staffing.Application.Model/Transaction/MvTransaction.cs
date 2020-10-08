using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Transaction
{
    public class MvTransaction
    {
        [Required]
        public int transactionId { get; set; }
    }

    public class MvTransactionAdd
    {
        [Required]
        public int assignmentId { get; set; }
    }
}
