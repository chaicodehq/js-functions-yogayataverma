export function repeatChar(char, n) {
  if (typeof char !== "string" || char === "") return "";
  if (n <= 0) return "";
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  if (!Array.isArray(arr)) return 0;
  if (arr.length === 0) return 0;
  const [first, ...rest] = arr;
  if (Array.isArray(first)) return sumNestedArray(first) + sumNestedArray(rest);
  if (typeof first === "number") return first + sumNestedArray(rest);
  return sumNestedArray(rest);
}

export function flattenArray(arr) {
  if (!Array.isArray(arr)) return [];
  if (arr.length === 0) return [];
  const [first, ...rest] = arr;
  if (Array.isArray(first)) return [...flattenArray(first), ...flattenArray(rest)];
  return [first, ...flattenArray(rest)];
}

export function isPalindrome(str) {
  if (typeof str !== "string") return false;
  if (str.length <= 1) return true;
  const s = str.toLowerCase();
  if (s[0] !== s[s.length - 1]) return false;
  return isPalindrome(s.slice(1, -1));
}

export function generatePattern(n) {
  if (!Number.isInteger(n) || n <= 0) return [];
  if (n === 1) return ["*"];
  function buildAsc(k) {
    if (k === 1) return ["*"];
    return [...buildAsc(k - 1), repeatChar("*", k)];
  }
  const asc = buildAsc(n);
  return [...asc, ...asc.slice(0, -1).reverse()];
}
