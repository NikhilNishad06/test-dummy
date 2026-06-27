import { dummyDeals } from './deals';

export const dummyRefunds = Array.from({ length: 20 }, (_, i) => {
  const deal = dummyDeals[i % dummyDeals.length];
  const types = ["EMD Refund", "EMD Adjustment", "Government Refund", "Lapse Case"];
  const statuses = ["Pending", "Approved", "Refunded", "Lapsed"];
  
  const type = types[i % types.length];
  const status = statuses[i % statuses.length];
  const amount = Math.floor(Math.random() * 500000) + 50000;

  return {
    id: `REF-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    refundType: type,
    amount: amount,
    status: status,
    paymentDate: status === "Refunded" ? new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString() : null,
  };
});
