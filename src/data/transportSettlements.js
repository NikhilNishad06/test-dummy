import { dummySalesDispatches } from './salesDispatches';

export const dummyTransportSettlements = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["Pending", "Partial", "Paid"];
  const dispatch = dummySalesDispatches[i];
  const status = statuses[i % statuses.length];

  const freightRate = 1200;
  const freightAmount = freightRate * dispatch.quantity;
  const advance = Math.floor(freightAmount * 0.7); // 70% advance
  
  let paid = advance;
  if (status === "Paid") paid = freightAmount;
  else if (status === "Pending") paid = 0; // Not even advance paid

  return {
    id: `TS-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: dispatch.dealId,
    dispatchId: dispatch.truckDispatchId,
    transporter: "Navkar Lifters", // Mock
    truckNumber: dispatch.truckNumber,
    freightRate: freightRate,
    freightAmount: freightAmount,
    advance: advance,
    paidAmount: paid,
    balance: freightAmount - paid,
    paymentDate: status === "Paid" ? new Date().toISOString() : null,
    status: status,
    remarks: ""
  };
});
