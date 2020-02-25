import { Entity } from "../entity";
import { getNextCoords } from "../events";
import { isEmptyTile } from "../map";
import { gameEngine } from "../scenes/Play";

/** Lock the gameEngine when a controllable entity starts movings. */
export const moveStart = (entity: Entity) => {
  if (!entity.props.controllable) return;
  gameEngine.lock();
};

/** Move an entity and unlock the gameEngine when pressing a valid keyboard key. */
export const moveEnd = (entity: Entity, code: string) => {
  if (entity.props.controllable === false) return false;
  const [dX, dY] = getNextCoords(code);
  if (isEmptyTile(entity.x + dX, entity.y + dY)) {
    entity.move(entity.x + dX, entity.y + dY);
    if (dX !== 0 || dY !== 0) {
      gameEngine.unlock();
    }
    return true;
  }
  return false;
};
