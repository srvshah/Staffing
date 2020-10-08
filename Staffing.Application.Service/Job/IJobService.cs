using Staffing.Application.Model.Job;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Job
{
    public interface IJobService
    {
        dynamic GetAllJobs();
        bool AddJob(MvJob job);
        bool UpdateJob(MvJobUpdate job);
    }
}
