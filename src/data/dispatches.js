import { dummyWorkOrders } from './workOrders';

export const dummyDispatches = Array.from({ length: 40 }, (_, i) => {
  const statuses = ["Planned", "Loading", "Loaded", "Dispatched", "In Transit", "Reached", "Unloaded", "Closed"];
  const wo = dummyWorkOrders[i % dummyWorkOrders.length];
  
  const drivers = ["Ramu Kaka", "Shyam Singh", "Ali Bhai", "Gurpreet Singh"];
  const transporters = ["Navkar Lifters", "Balaji Transport", "Express Movers", "SuperFast Transport"];
  const destinations = ["Jindal Power Plant", "Bhilai Steel Plant", "ACC Cement", "Sponge Iron Factory"];

  const truckNo = `CG-04-MT-${1000 + i}`;
  const rate = Math.floor(Math.random() * (1500 - 800) + 800);
  const qty = 30; // standard truck MT

  return {
    id: `DSP-2026-${(i + 1).toString().padStart(4, '0')}`,
    dealId: wo.dealId,
    doNumber: wo.doNumber,
    workOrder: wo.id,
    firm: wo.lifter, // using lifter as firm context here for simplicity, or ASAK
    mine: wo.mine,
    grade: wo.grade,
    truckNumber: truckNo,
    driverName: drivers[i % drivers.length],
    driverMobile: `98765${10000 + i}`,
    transporter: transporters[i % transporters.length],
    loadingDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString(),
    loadingTime: "14:30",
    destinationParty: "Client XYZ",
    destinationAddress: destinations[i % destinations.length],
    freightRate: rate,
    estimatedFreight: rate * qty,
    quantity: qty,
    status: statuses[i % statuses.length],
    remarks: "Handle with care."
  };
});
