export const dummyAudit = Array.from({ length: 50 }, (_, i) => {
  const modules = ["Sales", "Finance", "Delivery", "Government", "Masters", "Auctions"];
  const actions = ["Create", "Update", "Delete", "Export", "Login"];

  return {
    id: `AUD-${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 72 * 3600000)).toISOString(),
    user: "Admin User",
    module: modules[i % modules.length],
    action: actions[i % actions.length],
    record: `Record ID ${i + 100}`,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    status: i % 10 === 0 ? "Failed" : "Success"
  };
});
