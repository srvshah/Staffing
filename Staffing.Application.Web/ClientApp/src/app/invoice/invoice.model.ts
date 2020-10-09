export interface MvInvoice{
    invoiceId: number;
    invoiceNumber: string;
    customerName: string;
    employeeName: string;
    total: number;
}

export interface MvInvoiceDetail{
    assignmentId: number;
    amount: number;
    rate: number;
    hoursWorked: number;
    employeeName: string;
    jobTitle: string;
}

