using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Staffing.Application.DataAccess;
using Staffing.Application.Model.Assignment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Staffing.Application.Service.Assignment
{
    public class AssignmentService: IAssignmentService
    {

        private readonly IConfiguration _configuration;
        private readonly string _connStr;
        private readonly string _commandTimeout;
        private DataAccessHelper _dah;

        public AssignmentService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("ConnectionStrings");
            _connStr = _configuration["DefaultConnection"];
            if (!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }

            _commandTimeout = _configuration["CommandTimeOut"];
        }

        public dynamic GetAllAssignments()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAssignmentSel", conn))
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

        public bool AddAssignment(MvAssignment assignment)
        {
            var jsonNew = JsonConvert.SerializeObject(assignment);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAssignmentIns", conn))
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

        public bool UpdateAssignment(MvAssignmentUpdate assignment)
        {
            var jsonNew = JsonConvert.SerializeObject(assignment);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpAssignmentUpd", conn))
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
