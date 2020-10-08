using Staffing.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        dynamic GetAllAssignments();
        bool AddAssignment(MvAssignment assignment);
        bool UpdateAssignment(MvAssignmentUpdate assignment);
    }
}
