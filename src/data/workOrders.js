import { dummyLifterAssignments } from './lifterAssignments';

export const dummyWorkOrders = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Draft", "Active", "Completed", "Cancelled"];
  const la = dummyLifterAssignments[i];

  return {
    id: la.workOrderNumber,
    dealId: la.dealId,
    doNumber: la.doNumber,
    lifter: la.lifter,
    mine: la.mine,
    grade: dummyLifterAssignments[i].grade || "G11",
    quantity: la.assignedQuantity,
    startDate: la.assignmentDate,
    targetDate: new Date(new Date(la.assignmentDate).getTime() + 30 * 86400000).toISOString(),
    status: statuses[i % statuses.length],
    terms: "Payment after lifting 50% quantity.",
    remarks: "Expedite dispatch."
  };
});
