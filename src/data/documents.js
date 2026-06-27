export const dummyDocuments = Array.from({ length: 40 }, (_, i) => {
  const categories = ["Auction Documents", "EMD Documents", "Sale Letters", "Payment Advice", "Government Payments", "DO Documents", "Work Orders", "Dispatch Documents", "Customer Orders", "Invoices", "Collections", "Transport Bills", "Commission Documents"];
  
  const ext = i % 4 === 0 ? ".xlsx" : ".pdf";
  const cat = categories[i % categories.length];

  return {
    id: `DOC-${i + 1}`,
    name: `${cat.replace(' ', '_')}_${i+1}${ext}`,
    category: cat,
    dealId: `DL-2026-${(i % 10 + 1).toString().padStart(4, '0')}`,
    size: `${Math.floor(Math.random() * 500) + 10} KB`,
    uploadedBy: "Admin User",
    uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 86400000)).toISOString(),
    version: "v1.0"
  };
});
