import { createWolf } from "../entities/wolf.js";
import { createDeer } from "../entities/deer.js";
import { createPlant } from "../entities/plant.js";

export const World = {
  width: 40,
  height: 25,

  entities: {
    wolf_1: createWolf(5, 5),
    wolf_2: createWolf(8, 6),

    deer_1: createDeer(15, 10),
    deer_2: createDeer(20, 12),
    deer_3: createDeer(18, 14)
  },

  plants: {
    plant_1: createPlant(10, 10),
    plant_2: createPlant(18, 12),
    plant_3: createPlant(25, 14),
    plant_4: createPlant(30, 8)
  },

  removeDead() {
    for (const id in this.entities) {
      if (this.entities[id].energy <= 0) {
        delete this.entities[id];
      }
    }
  }
};
