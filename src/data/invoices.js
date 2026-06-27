import { dummySalesDispatches } from './salesDispatches';
import { dummyCustomerOrders } from './customerOrders';

export const dummyInvoices = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Draft", "Generated", "Sent", "Paid", "Partial", "Overdue"];
  const sd = dummySalesDispatches[i];
  const order = dummyCustomerOrders.find(o => o.dealId === sd.dealId) || dummyCustomerOrders[0];
  
  const taxable = sd.quantity * order.rate;
  const gst = taxable * 0.05; // 5% GST for coal
  const total = taxable + gst;

  return {
    id: `INV-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: sd.dealId,
    dispatchId: sd.id,
    customer: sd.customer,
    doNumber: sd.doNumber,
    invoiceDate: new Date(Date.now() - Math.floor(Math.random() * 10 * 86400000)).toISOString(),
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString(),
    quantity: sd.quantity,
    taxableAmount: taxable,
    gst: gst,
    totalAmount: total,
    status: statuses[i % statuses.length]
  };
});
