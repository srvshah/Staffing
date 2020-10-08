using Staffing.Application.Model.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Employee
{
    public interface IEmployeeService
    {
        dynamic GetAllEmployees();
        bool AddEmployee(MvEmployee employee);
        bool UpdateEmployee(MvEmployeeUpdate employee);
    }
}
