using Microsoft.AspNetCore.Mvc;
using Staffing.Application.Model.Employee;
using Staffing.Application.Service.Employee;
using Staffing.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Staffing.Application.WebApi.Areas.Employee
{
    public class EmployeeController : BaseController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var jsonString = _employeeService.GetAllEmployees();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] MvEmployee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _employeeService.AddEmployee(employee);
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

        [HttpPost]
        public IActionResult UpdateEmployee([FromBody] MvEmployeeUpdate employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updated = _employeeService.UpdateEmployee(employee);
                if (!updated)
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
    }
}
