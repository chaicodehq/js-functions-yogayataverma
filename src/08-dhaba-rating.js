export function createFilter(field, operator, value) {
  const ops = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b,
  };
  if (!ops[operator]) return () => false;
  return (obj) => ops[operator](obj[field], value);
}

export function createSorter(field, order = "asc") {
  return (a, b) => {
    const va = a[field], vb = b[field];
    let cmp = 0;
    if (typeof va === "string") cmp = va.localeCompare(vb);
    else cmp = va - vb;
    return order === "desc" ? -cmp : cmp;
  };
}

export function createMapper(fields) {
  return (obj) => {
    const result = {};
    for (const f of fields) result[f] = obj[f];
    return result;
  };
}

export function applyOperations(data, ...operations) {
  if (!Array.isArray(data)) return [];
  return operations.reduce((result, fn) => fn(result), data);
}
