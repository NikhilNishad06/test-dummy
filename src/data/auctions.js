import { dummyDeals } from './deals';

export const dummyAuctions = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Received", "Ready", "EMD Pending", "Bid Submitted", "Won", "Lost", "Cancelled"];
  const deal = dummyDeals[i % dummyDeals.length];
  const baseDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));

  return {
    id: `AUC-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    firm: deal.firm,
    coalCompany: "WCL",
    mine: deal.mine,
    coalGrade: deal.coalGrade,
    quantity: deal.quantity,
    basePrice: deal.purchaseRate - 100, // Slightly lower than purchase rate
    notificationDate: baseDate.toISOString(),
    bidDate: new Date(baseDate.getTime() + 5 * 86400000).toISOString(),
    bidClosingTime: "15:00:00",
    status: statuses[i % statuses.length],
    emdRequired: deal.quantity * 100, // Dummy EMD logic
    notes: "Requires quick turnaround on EMD."
  };
});
