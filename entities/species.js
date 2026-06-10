export function createWolf(x, y) {
  return {
    x, y,
    type: "wolf",
    energy: 12,
    genes: { speed: 1, vision: 8, metabolism: 0.05 }
  };
}

export function createDeer(x, y) {
  return {
    x, y,
    type: "deer",
    energy: 12,
    genes: { speed: 1, vision: 6, metabolism: 0.02 }
  };
}
