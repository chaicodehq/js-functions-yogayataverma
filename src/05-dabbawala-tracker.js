export function createDabbawala(name, area) {
  let deliveries = [];
  let nextId = 0;

  return {
    addDelivery(from, to) {
      if (!from || !to) return -1;
      nextId++;
      deliveries.push({ id: nextId, from, to, status: "pending" });
      return nextId;
    },
    completeDelivery(id) {
      const d = deliveries.find(d => d.id === id);
      if (!d || d.status === "completed") return false;
      d.status = "completed";
      return true;
    },
    getActiveDeliveries() {
      return deliveries.filter(d => d.status === "pending").map(d => ({ ...d }));
    },
    getStats() {
      const total = deliveries.length;
      const completed = deliveries.filter(d => d.status === "completed").length;
      const pending = total - completed;
      const successRate = total === 0 ? "0.00%" : (completed / total * 100).toFixed(2) + "%";
      return { name, area, total, completed, pending, successRate };
    },
    reset() {
      deliveries = [];
      nextId = 0;
      return true;
    }
  };
}
