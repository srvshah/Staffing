using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Staffing.Application.DataAccess;
using Staffing.Application.Model.Transaction;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Staffing.Application.Service.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connStr;
        private readonly string _commandTimeout;
        private DataAccessHelper _dah;

        public TransactionService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("ConnectionStrings");
            _connStr = _configuration["DefaultConnection"];
            if (!string.IsNullOrEmpty(_connStr))
            {
                _dah = new DataAccessHelper(_connStr);
            }

            _commandTimeout = _configuration["CommandTimeOut"];
        }

        public dynamic GetAllTransactions()
        {
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpTransactionSel", conn))
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

        public bool AddTransaction(IEnumerable<MvTransactionAdd> assignments)
        {
            var jsonNew = JsonConvert.SerializeObject(assignments);
            using (var conn = _dah.GetConnection())
            {
                using (var cmd = new SqlCommand("SpTransactionIns", conn))
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
