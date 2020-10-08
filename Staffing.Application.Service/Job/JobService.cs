using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Staffing.Application.DataAccess;
using Staffing.Application.Model.Job;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Staffing.Application.Service.Job
{
    public class JobService : IJobService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connStr;
        private readonly string _commandTimeout;
        private DataAccessHelper _dah;

        public JobService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("ConnectionStrings");
            _connStr = _configuration["DefaultConnection"];
            if (!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }

            _commandTimeout = _configuration["CommandTimeOut"];
        }

        public dynamic GetAllJobs()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpJobSel", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
                    using (var reader = cmd.ExecuteReader())
                    {
                        try
                        {
                            if (reader.HasRows)
                            {
                                return _dah.GetJson(reader);
                            }
                            return null;
                        }
                        catch (Exception ex)
                        {

                            throw ex;
                        }
                    }
                }
            }
        }

        public bool AddJob(MvJob job)
        {
            var jsonNew = JsonConvert.SerializeObject(job);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpJobIns", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
                    int rows = cmd.ExecuteNonQuery();
                    if (rows > 0)
                    {
                        return true;
                    }
                    return false;

                }

            }
        }

        public bool UpdateJob(MvJobUpdate job)
        {
            var jsonNew = JsonConvert.SerializeObject(job);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpJobUpd", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = jsonNew;
                    cmd.CommandTimeout = int.Parse(_commandTimeout);
                    int rows = cmd.ExecuteNonQuery();
                    if (rows > 0)
                    {
                        return true;
                    }
                    return false;

                }

            }
        }


    }
}
