import { dummyDeals } from './deals';

export const dummyVendorPayments = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Pending", "Partial", "Paid"];
  const deal = dummyDeals[i % dummyDeals.length];
  const status = statuses[i % statuses.length];

  const amount = deal.dealValue || 1500000;
  
  let paid = 0;
  if (status === "Paid") paid = amount;
  else if (status === "Partial") paid = Math.floor(amount * 0.5);

  return {
    id: `VP-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    vendor: deal.coalCompany,
    invoiceReference: `VEN-INV-${(1000 + i)}`,
    amount: amount,
    paidAmount: paid,
    balance: amount - paid,
    dueDate: new Date(Date.now() + Math.floor(Math.random() * 15 * 86400000)).toISOString(),
    paymentDate: status !== "Pending" ? new Date().toISOString() : null,
    interestDays: status === "Pending" ? Math.floor(Math.random() * 10) : 0,
    interestAmount: status === "Pending" ? Math.floor(Math.random() * 5000) : 0,
    status: status,
    remarks: ""
  };
});
