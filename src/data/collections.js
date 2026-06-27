import { dummyInvoices } from './invoices';

export const dummyCollections = Array.from({ length: 40 }, (_, i) => {
  const statuses = ["Pending", "Partial", "Received", "Overdue"];
  const invoice = dummyInvoices[i % dummyInvoices.length];
  
  const status = statuses[i % statuses.length];
  
  let received = 0;
  if (status === "Received") received = invoice.totalAmount;
  else if (status === "Partial") received = Math.floor(invoice.totalAmount * 0.4);

  const balance = invoice.totalAmount - received;

  return {
    id: `COL-2026-${(i + 1).toString().padStart(4, '0')}`,
    invoiceNumber: invoice.id,
    dealId: invoice.dealId,
    customer: invoice.customer,
    invoiceAmount: invoice.totalAmount,
    receivedAmount: received,
    balanceAmount: balance,
    dueDate: invoice.dueDate,
    paymentDate: (status === "Received" || status === "Partial") ? new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString() : null,
    bank: (status === "Received" || status === "Partial") ? "HDFC Bank" : "-",
    utrNumber: (status === "Received" || status === "Partial") ? `UTR${Math.floor(Math.random() * 1000000000)}` : "-",
    tds: 0,
    deduction: 0,
    status: status,
    remarks: status === "Overdue" ? "Follow up required" : "Clear"
  };
});
