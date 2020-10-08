using Microsoft.AspNetCore.Mvc;
using Staffing.Application.Model.Assignment;
using Staffing.Application.Service.Assignment;
using Staffing.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Staffing.Application.WebApi.Areas.Assignment
{
    public class AssignmentController : BaseController
    {
        private readonly IAssignmentService _assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet]
        public IActionResult GetAllAssignments()
        {
            try
            {
                var jsonString = _assignmentService.GetAllAssignments();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult AddAssignment([FromBody] MvAssignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _assignmentService.AddAssignment(assignment);
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
        public IActionResult UpdateAssignment([FromBody] MvAssignmentUpdate assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _assignmentService.UpdateAssignment(assignment);
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
    }
}
