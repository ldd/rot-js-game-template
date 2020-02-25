import { Entity } from "../entity";
import { getNextCoords } from "../events";
import { getEntityAt, getOtherEntities } from "../map";
import { gameEngine } from "../scenes/Play";

/** Do damage with a damageable entity. */
export const actionStart = (entity: Entity) => {
  if (!entity.props.damageable) return;
  const otherEntities: Entity[] = getOtherEntities(entity, "controllable");
  if (otherEntities.length === 0) return;
  const [otherEntity] = otherEntities;
  if (otherEntity === undefined || otherEntity === entity) return;

  const { x, y } = otherEntity;
  const hamiltonDistance = Math.abs(entity.x - x) + Math.abs(entity.y - y);

  if (hamiltonDistance === 1) {
    otherEntity.damage(1);
  }
};

export const damageEnd = (entity: Entity, code: string) => {
  if (!entity.props.damageable) return;
  const [dX, dY] = getNextCoords(code);
  const otherEntity = getEntityAt(entity.x + dX, entity.y + dY);
  if (otherEntity === undefined || otherEntity === entity) return;

  if (dX !== 0 || dY !== 0) {
    otherEntity.damage(1);
    gameEngine.unlock();
  }
};
