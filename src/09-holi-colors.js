export function mixColors(color1, color2) {
  if (!color1 || !color2) return null;
  return {
    name: `${color1.name}-${color2.name}`,
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  };
}

export function adjustBrightness(color, factor) {
  if (!color || typeof factor !== "number") return null;
  const clamp = (v) => Math.round(Math.min(255, Math.max(0, v)));
  return { name: color.name, r: clamp(color.r * factor), g: clamp(color.g * factor), b: clamp(color.b * factor) };
}

export function addToPalette(palette, color) {
  if (!Array.isArray(palette)) return color ? [color] : [];
  if (!color) return [...palette];
  return [...palette, color];
}

export function removeFromPalette(palette, colorName) {
  if (!Array.isArray(palette)) return [];
  return palette.filter(c => c.name !== colorName);
}

export function mergePalettes(palette1, palette2) {
  const p1 = Array.isArray(palette1) ? palette1 : [];
  const p2 = Array.isArray(palette2) ? palette2 : [];
  const merged = [...p1];
  for (const c of p2) {
    if (!merged.find(m => m.name === c.name)) merged.push(c);
  }
  return merged;
}
