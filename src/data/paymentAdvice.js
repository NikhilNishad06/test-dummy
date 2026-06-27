import { dummySaleLetters } from './saleLetters';
import { dummyDeals } from './deals';

export const dummyPaymentAdvice = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pending", "Received", "Payment Pending", "Completed"];
  const sl = dummySaleLetters[i];
  const deal = dummyDeals.find(d => d.id === sl.dealId) || dummyDeals[0];
  const gross = sl.totalAmount;
  const emd = deal.quantity * 100; // Mock EMD adjusted
  const taxes = gross * 0.18; // 18% GST

  return {
    id: `PA-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: sl.dealId,
    saleLetterNo: sl.id,
    firm: sl.firm,
    adviceDate: new Date(new Date(sl.issueDate).getTime() + 2 * 86400000).toISOString(),
    grossAmount: gross,
    lessEmd: emd,
    taxes: taxes,
    otherCharges: 0,
    netPayable: gross - emd + taxes,
    dueDate: sl.dueDate,
    status: statuses[i % statuses.length],
    remarks: "Includes GST."
  };
});
