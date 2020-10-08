using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Staffing.Application.Model.Assignment
{
    public class MvAssignment
    {
        [Required]
        public int jobId { get; set; }

        [Required]
        public int employeeId { get; set; }
    }

    public class MvAssignmentUpdate
    {
        [Required]
        public int assignmentId { get; set; }

        public int jobId { get; set; }

        public int employeeId { get; set; }

        public bool status { get; set; }
    }
}
