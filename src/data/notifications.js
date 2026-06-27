export const dummyNotifications = Array.from({ length: 20 }, (_, i) => {
  const categories = ["Auction Alerts", "Payment Due", "DO Expiry", "Dispatch Delay", "Collection Due", "System Notifications"];
  const priorities = ["High", "Normal"];

  return {
    id: `NOTIF-${i + 1}`,
    category: categories[i % categories.length],
    priority: priorities[i % priorities.length],
    message: `This is a dummy notification for ${categories[i % categories.length]}`,
    time: new Date(Date.now() - Math.floor(Math.random() * 24 * 3600000)).toISOString(),
    read: i % 3 !== 0
  };
});
