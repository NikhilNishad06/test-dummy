import { dummyDispatches } from './dispatches';

export const dummyWeighbridge = Array.from({ length: 40 }, (_, i) => {
  const dispatch = dummyDispatches[i];
  
  // Base weight around 30 MT
  const mineWt = 30 + (Math.random() * 2 - 1); // 29 to 31
  // Customer weight slightly less
  const custWt = mineWt - (Math.random() * 0.5); 
  const diff = mineWt - custWt;
  const shortage = diff > 0.3 ? (diff - 0.3) : 0; // Allow 300kg tolerance

  return {
    id: `WB-2026-${(i + 1).toString().padStart(4, '0')}`,
    dispatchId: dispatch.id,
    truckNumber: dispatch.truckNumber,
    mineWeight: parseFloat(mineWt.toFixed(2)),
    customerWeight: parseFloat(custWt.toFixed(2)),
    weightDifference: parseFloat(diff.toFixed(2)),
    shortage: parseFloat(shortage.toFixed(2)),
    status: shortage > 0 ? "Shortage Detected" : "Matched",
    date: dispatch.loadingDate,
    remarks: shortage > 0 ? "Deduct from transport bill" : "All okay"
  };
});
