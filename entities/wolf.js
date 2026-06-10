export function createWolf(x, y) {
  return {
    x,
    y,
    type: "wolf",
    energy: 12,
    genes: {
      speed: 1,
      vision: 8,
      metabolism: 0.05
    }
  };
}
