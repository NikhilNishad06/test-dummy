import { dummyDeals } from './deals';
import { dummyInvoices } from './invoices';

export const dummyCommissions = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Pending", "Paid"];
  const invoice = dummyInvoices[i];
  const deal = dummyDeals.find(d => d.id === invoice.dealId) || dummyDeals[0];
  const status = statuses[i % statuses.length];

  const type = i % 2 === 0 ? "Quantity Wise" : "Bill Wise";
  const rate = type === "Quantity Wise" ? 50 : 25; // 50/MT or 25/Bill
  const amount = type === "Quantity Wise" ? rate * invoice.quantity : rate;

  return {
    id: `COMM-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: invoice.dealId,
    broker: "Raju Bhai Broker", // Mock
    customer: invoice.customer,
    invoiceId: invoice.id,
    commissionType: type,
    quantity: invoice.quantity,
    commissionRate: rate,
    commissionAmount: amount,
    paidAmount: status === "Paid" ? amount : 0,
    balance: status === "Paid" ? 0 : amount,
    paymentDate: status === "Paid" ? new Date().toISOString() : null,
    status: status,
    remarks: ""
  };
});
