using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Customer
{
    public class MvCustomer
    {
        [Required]
        public string name { get; set; }

        [Required]
        public string detail { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public int mobile { get; set; }

        public int? phone { get; set; }
    }

    public class MvCustomerUpdate
    {
        [Required]
        public int organizationId { get; set; }

        public string name { get; set; }
        public string detail { get; set; }
        public string address { get; set; }
        public int mobile { get; set; }
        public int? phone { get; set; }
    }
}
