using Staffing.Application.Model.Customer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Staffing.Application.Service.Customer
{
    public interface ICustomerService
    {
        dynamic GetAllCustomers();
        bool AddCustomer(MvCustomer customer);
    }
}
