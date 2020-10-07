using Staffing.Application.Model.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Account
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
        dynamic GetAllUserDetail();
    }
}
