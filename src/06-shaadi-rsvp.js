export function processGuests(guests, filterFn) {
  if (!Array.isArray(guests) || typeof filterFn !== "function") return [];
  return guests.filter(filterFn);
}

export function notifyGuests(guests, notifyCallback) {
  if (!Array.isArray(guests) || typeof notifyCallback !== "function") return [];
  return guests.map(notifyCallback);
}

export function handleRSVP(guest, onAccept, onDecline) {
  if (!guest || typeof onAccept !== "function" || typeof onDecline !== "function") return null;
  if (guest.rsvp === "yes") return onAccept(guest);
  if (guest.rsvp === "no") return onDecline(guest);
  return null;
}

export function transformGuestList(guests, ...transformFns) {
  if (!Array.isArray(guests)) return [];
  return transformFns.reduce((result, fn) => fn(result), guests);
}
