export const dummyDeals = Array.from({ length: 20 }, (_, i) => {
  const firm = i % 2 === 0 ? "ASAK Coal Pvt. Ltd." : "Jai Bhole Enterprises";
  const stages = ["Deal Created", "Auction", "EMD", "Bid", "Sale Letter", "Payment Advice", "Government Payment", "Application", "Delivery Order", "Lifter", "Dispatch", "Customer Order", "Invoice", "Collection", "Transport", "Commission", "Refund", "Completed"];
  const currentStageIndex = Math.floor(Math.random() * stages.length);
  
  const purchaseRate = 5000 + Math.floor(Math.random() * 2000);
  const saleRate = purchaseRate + 500 + Math.floor(Math.random() * 1000);
  const qty = 1000 + Math.floor(Math.random() * 10000);
  
  return {
    id: `DL-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealName: `Contract for ${qty}MT - ${firm}`,
    firm: firm,
    source: i % 3 === 0 ? "Third Party" : "Auction",
    mine: i % 2 === 0 ? "WCL Mine 1" : "SECL Mine A",
    coalGrade: `G${(i % 14) + 1}`,
    quantity: qty,
    purchaseRate: purchaseRate,
    expectedSaleRate: saleRate,
    expectedProfit: (saleRate - purchaseRate) * qty,
    createdDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    currentStage: stages[currentStageIndex],
    status: currentStageIndex === stages.length - 1 ? "Closed" : (currentStageIndex > 0 ? "Active" : "Pending"),
    assignedUser: i % 2 === 0 ? "Amit Singh" : "Rajesh Kumar",
    transactionType: "Market Coal",
    expectedTransportCost: 100 * qty,
    expectedCommission: 50 * qty,
    otherCharges: 20 * qty,
    expectedMargin: (saleRate - purchaseRate - 170) * qty,
    dealOwner: "Admin",
    operationsTeam: "Ops Team A",
    billingTeam: "Billing Team B",
    collectionTeam: "Collection Team A",
    purchasedQty: currentStageIndex > 4 ? qty : 0,
    liftedQty: currentStageIndex > 9 ? Math.floor(qty * 0.8) : 0,
    pendingQty: currentStageIndex > 9 ? Math.floor(qty * 0.2) : qty,
    soldQty: currentStageIndex > 11 ? Math.floor(qty * 0.8) : 0,
  };
});
