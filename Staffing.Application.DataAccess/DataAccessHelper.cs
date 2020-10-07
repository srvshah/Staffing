using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;

namespace Staffing.Application.DataAccess
{
    public class DataAccessHelper
    {
        private readonly string _connStr;
        private SqlConnection _cn;

        public DataAccessHelper(string connStr)
        {
            _connStr = connStr;
        }


        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _cn;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private void SetConnection()
        {
            _cn = new SqlConnection(_connStr);
            if (_cn.State == System.Data.ConnectionState.Closed)
            {
                _cn.Open();
            }
            else
            {
                _cn.Close();
                _cn.Open();
            }
        }

        public dynamic GetJson(SqlDataReader rd)
        {
            var dataTable = new DataTable();
            dataTable.Load(rd);

            if (dataTable.Rows[0] != null && dataTable.Rows[0]["Json"].ToString() != null)
            {
                return JsonConvert.DeserializeObject(dataTable.Rows[0]["Json"].ToString());
            }
            return null;

        }

    }
}
