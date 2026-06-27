import { dummyPaymentAdvice } from './paymentAdvice';

export const dummyGovtPayments = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pending", "Paid", "Submitted", "Confirmed"];
  const pa = dummyPaymentAdvice[i];

  return {
    id: `GP-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: pa.dealId,
    saleLetterNo: pa.saleLetterNo,
    firm: pa.firm,
    grossAmount: pa.grossAmount,
    lessEmd: pa.lessEmd,
    netAmount: pa.netPayable,
    bank: i % 2 === 0 ? "HDFC Bank" : "State Bank of India",
    paymentDate: new Date(new Date(pa.adviceDate).getTime() + 1 * 86400000).toISOString(),
    utrNumber: `UTR${Math.floor(Math.random() * 1000000000)}`,
    sentToOffice: i % 2 === 0 ? "WCL HQ Nagpur" : "SECL Bilaspur",
    responsiblePerson: "Amit Singh",
    status: statuses[i % statuses.length],
    remarks: "Payment confirmed."
  };
});
