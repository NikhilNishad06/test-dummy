import { dummyDeals } from './deals';

export const dummyCustomerOrders = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Order Received", "Allocation Pending", "Allocated", "Dispatch Started", "Partially Delivered", "Completed", "Cancelled"];
  const customers = ["Jindal Steel", "Ambuja Cements", "Birla Gold", "Balco Industries"];
  const deal = dummyDeals[i % dummyDeals.length];
  
  const qty = deal.quantity + Math.floor(Math.random() * 500);
  const rate = Math.floor(Math.random() * 2000) + 4000;

  return {
    id: `SO-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: deal.id,
    firm: deal.firm,
    customerName: customers[i % customers.length],
    orderDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString(),
    coalGrade: deal.coalGrade,
    orderedQuantity: qty,
    rate: rate,
    deliveryLocation: "Customer Plant",
    deliveryDate: new Date(Date.now() + 15 * 86400000).toISOString(),
    status: statuses[i % statuses.length],
    paymentTerms: "100% Advance",
    broker: "Self",
    remarks: "High priority delivery."
  };
});
