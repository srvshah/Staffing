using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Employee
{
    public class MvEmployee
    {
        [Required]
        public string firstName { get; set; }

        public string middleName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public int mobile { get; set; }

        public int? phone { get; set; }

        public string username { get; set; }

        public string password { get; set; }

    }

    public class MvEmployeeUpdate
    {
        public int personId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public int mobile { get; set; }
        public int? phone { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
