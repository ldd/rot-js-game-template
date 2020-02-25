import { Entity } from "../entity";
import { getOtherEntities } from "../map";
import { sceneManager } from "../scenes";
import { moveEnd, moveStart as control } from "./controllable";
import { actionStart as damage, damageEnd } from "./damageable";
import { moveStart as move } from "./movable";

export const activeEntityMap: Map<string, Entity> = new Map();

/** Start behaviour for an entity according to its props. */
export function startBehaviour(entity: Entity) {
  const otherEntities: Entity[] = getOtherEntities(entity, "controllable");
  if (!entity.props.controllable && otherEntities.length === 0) {
    sceneManager.goToNextScene();
  }

  if (entity.props.controllable) control(entity);
  if (entity.props.movable) move(entity);
  if (entity.props.damageable) damage(entity);
}

/**
 * End behaviour for an entity according to its props.
 * Typically used when user interaction is needed. (e.g: pressing a key)
 */
function endBehaviour(entity: Entity, code: string) {
  if (!entity.isAlive()) return;
  const { controllable, damageable } = entity.props;
  if (controllable) {
    // note: we check if moveEnd returned true;
    // then you won't attack the same turn you moved
    // and you'll only be attacked once
    if (!moveEnd(entity, code)) {
      if (damageable) damageEnd(entity, code);
    }
  }
}

/**
 * Make a handler for controllable entities.
 * Ends controllable entitites turn after pressing an acceptable keyboard key.
 */
export function makeEntitiesHandler(entities: Entity[]) {
  activeEntityMap.clear();
  entities.forEach(entity => {
    activeEntityMap.set(entity.id, entity);
  });
  return (e: KeyboardEvent) =>
    entities.forEach(entity => endBehaviour(entity, e.code));
}
