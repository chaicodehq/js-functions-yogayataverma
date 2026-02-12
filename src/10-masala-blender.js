export function pipe(...fns) {
  if (fns.length === 0) return (x) => x;
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

export function compose(...fns) {
  if (fns.length === 0) return (x) => x;
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

export function grind(spice) {
  return { ...spice, form: "powder" };
}

export function roast(spice) {
  return { ...spice, roasted: true, aroma: "strong" };
}

export function mix(spice) {
  return { ...spice, mixed: true };
}

export function pack(spice) {
  return { ...spice, packed: true, label: `${spice.name} Masala` };
}

export function createRecipe(steps) {
  if (!Array.isArray(steps) || steps.length === 0) return (x) => x;
  const fnMap = { grind, roast, mix, pack };
  const fns = steps.map(s => fnMap[s]).filter(Boolean);
  if (fns.length === 0) return (x) => x;
  return pipe(...fns);
}
