import { dummyCustomerOrders } from './customerOrders';
import { dummyDispatches } from './dispatches';

export const dummySalesDispatches = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Ready", "Dispatched", "In Transit", "Delivered", "Closed"];
  const order = dummyCustomerOrders[i];
  const disp = dummyDispatches[i % dummyDispatches.length];

  return {
    id: `SD-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: order.dealId,
    customer: order.customerName,
    truckDispatchId: disp.id,
    doNumber: disp.doNumber,
    truckNumber: disp.truckNumber,
    quantity: disp.quantity,
    dispatchDate: disp.loadingDate,
    deliveryDate: new Date(new Date(disp.loadingDate).getTime() + 2 * 86400000).toISOString(),
    status: statuses[i % statuses.length]
  };
});
