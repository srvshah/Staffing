using Microsoft.AspNetCore.Mvc;
using Staffing.Application.Model.Job;
using Staffing.Application.Service.Customer;
using Staffing.Application.Service.Job;
using Staffing.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Staffing.Application.WebApi.Areas.Job
{
    public class JobController  : BaseController
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public IActionResult GetAllJobs()
        {
            try
            {
                var jsonString = _jobService.GetAllJobs();
                return Ok(jsonString);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public IActionResult AddJob([FromBody] MvJob job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _jobService.AddJob(job);
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
        public IActionResult UpdateJob([FromBody] MvJobUpdate job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var added = _jobService.UpdateJob(job);
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
