export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  const prices = { veg: 80, nonveg: 120, jain: 90 };
  if (!name) return null;
  if (!prices[mealType]) return null;
  const dailyRate = prices[mealType];
  const totalCost = dailyRate * days;
  return { name, mealType, days, dailyRate, totalCost };
}

export function combinePlans(...plans) {
  if (plans.length === 0) return null;
  const totalCustomers = plans.length;
  const totalRevenue = plans.reduce((sum, p) => sum + p.totalCost, 0);
  const mealBreakdown = {};
  for (const p of plans) {
    mealBreakdown[p.mealType] = (mealBreakdown[p.mealType] || 0) + 1;
  }
  return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;
  const addonTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const dailyRate = plan.dailyRate + addonTotal;
  const totalCost = dailyRate * plan.days;
  const addonNames = addons.map(a => a.name);
  return { ...plan, dailyRate, totalCost, addonNames };
}
