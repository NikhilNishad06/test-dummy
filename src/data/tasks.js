export const dummyTasks = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["To Do", "In Progress", "Review", "Completed"];
  const modules = ["Sales", "Finance", "Delivery", "Government"];
  const priorities = ["High", "Medium", "Low"];

  return {
    id: `TSK-${(i + 1).toString().padStart(3, '0')}`,
    title: `Follow up on Deal ${i + 1}`,
    dealId: `DL-2026-${(i % 10 + 1).toString().padStart(4, '0')}`,
    module: modules[i % modules.length],
    assignedTo: "Admin User",
    priority: priorities[i % priorities.length],
    dueDate: new Date(Date.now() + (i - 5) * 86400000).toISOString(),
    description: "Please check the status and update the system accordingly.",
    status: statuses[i % statuses.length]
  };
});
