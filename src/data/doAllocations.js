import { dummyCustomerOrders } from './customerOrders';
import { dummyDeliveryOrders } from './deliveryOrders';

export const dummyDoAllocations = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Pending", "Allocated", "Partial", "Completed"];
  const order = dummyCustomerOrders[i];
  const dOrder = dummyDeliveryOrders[i % dummyDeliveryOrders.length];
  
  const allocQty = Math.min(order.orderedQuantity, dOrder.pendingQuantity > 0 ? dOrder.pendingQuantity : order.orderedQuantity);
  const dispQty = Math.floor(allocQty * Math.random());

  return {
    id: `ALLOC-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: order.dealId,
    doNumber: dOrder.id,
    customer: order.customerName,
    orderedQuantity: order.orderedQuantity,
    allocatedQuantity: allocQty,
    dispatchedQuantity: dispQty,
    pendingQuantity: allocQty - dispQty,
    status: statuses[i % statuses.length],
    date: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString()
  };
});
