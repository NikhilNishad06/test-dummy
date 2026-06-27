import { dummyDeals } from './deals';

export const dummyDeliveryOrders = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pending", "Received", "Active", "Lifting Started", "Completed", "Expired", "Extension Required"];
  const deal = dummyDeals[i % dummyDeals.length];
  const baseDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
  const qty = deal.quantity;
  const lifted = Math.floor(Math.random() * qty);

  return {
    id: `DO-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    firm: deal.firm,
    doDate: baseDate.toISOString(),
    coalCompany: "WCL",
    mine: deal.mine,
    grade: deal.coalGrade,
    totalQuantity: qty,
    liftedQuantity: lifted,
    pendingQuantity: qty - lifted,
    allowedQuantity: qty,
    validFrom: baseDate.toISOString(),
    validTill: new Date(baseDate.getTime() + 45 * 86400000).toISOString(),
    status: statuses[i % statuses.length],
    remarks: "Standard lifting period applies."
  };
});
