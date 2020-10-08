using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Job
{
    public class MvJob
    {
        [Required]
        public string title { get; set; }

        [Required]
        public decimal rate { get; set; }

        [Required]
        public string detail { get; set; }

        [Required]
        public int customerId { get; set; }
    }

    public class MvJobUpdate
    {

        [Required]
        public int jobId { get; set; }

        public string title { get; set; }
        public decimal rate { get; set; }
        public string detail { get; set; }
        public int customerId { get; set; }
    }
}
