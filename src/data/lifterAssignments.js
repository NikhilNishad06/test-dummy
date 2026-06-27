import { dummyDeliveryOrders } from './deliveryOrders';

export const dummyLifterAssignments = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Pending", "Assigned", "Active", "Completed"];
  const dOrder = dummyDeliveryOrders[i % dummyDeliveryOrders.length];
  const assigned = dOrder.totalQuantity;
  const lifted = dOrder.liftedQuantity;
  const lifters = ["Singh Logistics", "Ramesh Transporters", "Navkar Lifters", "Balaji Transport"];

  return {
    id: `LA-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: dOrder.dealId,
    doNumber: dOrder.id,
    firm: dOrder.firm,
    mine: dOrder.mine,
    lifter: lifters[i % lifters.length],
    assignedQuantity: assigned,
    liftedQuantity: lifted,
    pendingQuantity: assigned - lifted,
    workOrderNumber: `WO-2026-${(i + 1).toString().padStart(4, '0')}`,
    assignmentDate: new Date(new Date(dOrder.validFrom).getTime() + 2 * 86400000).toISOString(),
    status: statuses[i % statuses.length],
    remarks: "Assigned full quantity to single lifter."
  };
});
