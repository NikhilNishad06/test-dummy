import { dummyAuctions } from './auctions';

export const dummyBids = Array.from({ length: 25 }, (_, i) => {
  const results = ["Pending", "Won", "Lost"];
  const auction = dummyAuctions[i % dummyAuctions.length];
  
  const bidRate = auction.basePrice + Math.floor(Math.random() * 500);
  const expectedSaleRate = bidRate + 800;
  
  return {
    id: `BID-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: auction.dealId,
    auctionNo: auction.id,
    firm: auction.firm,
    quantity: auction.quantity,
    bidRate: bidRate,
    expectedSaleRate: expectedSaleRate,
    expectedMargin: (expectedSaleRate - bidRate - 150) * auction.quantity, // Margin after transport & commission
    result: results[i % results.length],
    status: i % 5 === 0 ? "Draft" : "Submitted",
    transportEstimate: 100 * auction.quantity,
    commission: 50 * auction.quantity,
    otherCharges: 20 * auction.quantity,
  };
});
