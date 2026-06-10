export function createPlant(x, y) {
  return {
    x,
    y,
    type: "plant",
    biomass: 5,
    maxBiomass: 10,
    growthRate: 0.03
  };
}
