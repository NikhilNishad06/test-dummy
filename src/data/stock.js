import { dummyDeals } from './deals';

export const dummyStock = Array.from({ length: 30 }, (_, i) => {
  const deal = dummyDeals[i % dummyDeals.length];
  const openingStock = deal.quantity;
  const received = Math.floor(openingStock * (0.5 + Math.random() * 0.5));
  const dispatched = Math.floor(received * (0.2 + Math.random() * 0.8));
  const closingStock = received - dispatched;
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];
  let status = "In Stock";
  if (closingStock === 0) status = "Out of Stock";
  else if (closingStock < 500) status = "Low Stock";

  return {
    id: `STK-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    mine: deal.coalCompany,
    coalGrade: deal.coalGrade,
    openingStock: openingStock,
    received: received,
    dispatched: dispatched,
    closingStock: closingStock,
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    status: status
  };
});
