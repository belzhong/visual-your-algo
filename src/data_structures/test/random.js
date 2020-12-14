export function getRandomInteger(lo, hi) {
  return lo + Math.floor(Math.random() * (hi - lo));
}

export function getRandomIntegerArray(n, lo = 0, hi = n * 10) {
  const data = new Array(n);

  for (let i = 0; i < n; ++i) {
    data[i] = getRandomInteger(lo, hi);
  }

  return data;
}
