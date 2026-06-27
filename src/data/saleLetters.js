import { dummyDeals } from './deals';

export const dummySaleLetters = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Received", "Payment Pending", "Payment Completed", "Closed"];
  const deal = dummyDeals[i % dummyDeals.length];
  const baseDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
  const qty = deal.quantity;
  const rate = deal.purchaseRate;

  return {
    id: `SL-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    firm: deal.firm,
    coalCompany: "WCL",
    mine: deal.mine,
    coalGrade: deal.coalGrade,
    quantity: qty,
    rate: rate,
    totalAmount: qty * rate,
    issueDate: baseDate.toISOString(),
    dueDate: new Date(baseDate.getTime() + 15 * 86400000).toISOString(),
    status: statuses[i % statuses.length],
    remarks: "Standard terms apply."
  };
});
