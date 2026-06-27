import { dummyAuctions } from './auctions';

export const dummyEmds = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pending", "Paid", "Adjusted", "Refund Pending", "Refunded"];
  const auction = dummyAuctions[i % dummyAuctions.length];
  
  return {
    id: `EMD-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: auction.dealId,
    auctionNo: auction.id,
    firm: auction.firm,
    amount: auction.emdRequired,
    bank: i % 2 === 0 ? "HDFC Bank" : "State Bank of India",
    paymentDate: new Date(new Date(auction.notificationDate).getTime() + 2 * 86400000).toISOString(),
    utr: `UTR${Math.floor(Math.random() * 1000000000)}`,
    status: statuses[i % statuses.length],
    remarks: "Processed by finance."
  };
});
