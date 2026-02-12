export function calculateDosaOrder(type, quantity = 1, isSpicy = false) {
  const prices = { plain: 40, masala: 60, onion: 50, butter: 70, paper: 90, cheese: 80 };
  if (typeof type !== "string" || !prices[type]) return null;
  if (typeof quantity !== "number" || quantity <= 0 || Number.isNaN(quantity)) return null;

  const pricePerDosa = prices[type] + (isSpicy ? 10 : 0);
  const total = pricePerDosa * quantity;
  return { type, quantity, pricePerDosa, total };
}
