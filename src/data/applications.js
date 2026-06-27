import { dummyGovtPayments } from './govtPayments';

export const dummyApplications = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pending", "Submitted", "Receipt Received", "Query Raised", "Approved"];
  const gp = dummyGovtPayments[i];

  return {
    id: `APP-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: gp.dealId,
    firm: gp.firm,
    officeName: gp.sentToOffice,
    applicationDate: new Date(new Date(gp.paymentDate).getTime() + 1 * 86400000).toISOString(),
    submittedBy: "Rajesh Kumar",
    receiptNumber: i % 2 === 0 ? `REC${Math.floor(Math.random() * 10000)}` : "",
    receiptDate: i % 2 === 0 ? new Date(new Date(gp.paymentDate).getTime() + 2 * 86400000).toISOString() : null,
    status: statuses[i % statuses.length],
    checklist: {
      saleLetter: true,
      paymentProof: true,
      applicationForm: true,
      authLetter: true,
      firmDocs: true,
      otherDocs: false
    },
    queryDetails: statuses[i % statuses.length] === 'Query Raised' ? "Mismatched signature on auth letter." : "",
    remarks: "Waiting for DO."
  };
});
