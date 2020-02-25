import { Engine, Scheduler } from "rot-js";
import { Entity } from "../entity";

/** Initialize ROT.js engine with a scheduler. */
function initEngine(entities: Entity[]) {
  const scheduler = new Scheduler.Simple();
  entities.forEach(entity => scheduler.add(entity, true));

  const engine = new Engine(scheduler);
  return engine;
}

export { initEngine };
