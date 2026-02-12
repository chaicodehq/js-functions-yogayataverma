export function createDialogueWriter(genre) {
  const templates = {
    action: (hero, villain) => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`,
    romance: (hero, villain) => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`,
    comedy: (hero, villain) => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`,
    drama: (hero, villain) => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`,
  };
  if (!templates[genre]) return null;
  return (hero, villain) => {
    if (!hero || !villain) return "...";
    return templates[genre](hero, villain);
  };
}

export function createTicketPricer(basePrice) {
  if (typeof basePrice !== "number" || basePrice <= 0) return null;
  return (seatType, isWeekend = false) => {
    const multipliers = { silver: 1, gold: 1.5, platinum: 2 };
    if (!multipliers[seatType]) return null;
    let price = basePrice * multipliers[seatType];
    if (isWeekend) price *= 1.3;
    return Math.round(price);
  };
}

export function createRatingCalculator(weights) {
  if (!weights || typeof weights !== "object" || Array.isArray(weights)) return null;
  return (scores) => {
    let total = 0;
    for (const key of Object.keys(weights)) {
      if (scores[key] !== undefined) {
        total += scores[key] * weights[key];
      }
    }
    return Math.round(total * 10) / 10;
  };
}
