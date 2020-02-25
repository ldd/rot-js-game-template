import { Path } from "rot-js";
import { Entity } from "../entity";
import { getOtherEntities, isFreeTile } from "../map";

/** Move a movable entity towards a controllable entity. */
export const moveStart = (entity: Entity) => {
  if (!entity.props.movable) return;
  // get some other entity's coords
  const otherEntities: Entity[] = getOtherEntities(entity, "controllable");
  if (otherEntities.length === 0) return;

  const [otherEntity] = otherEntities;
  if (otherEntity === undefined || otherEntity === entity) return;
  const { x, y } = otherEntity;

  const astar = new Path.AStar(x, y, isFreeTile, { topology: 4 });
  const path: number[][] = [];
  const pathCallback = (x0: number, y0: number) => path.push([x0, y0]);
  astar.compute(entity.x, entity.y, pathCallback);
  if (path.length > 3) {
    const [, step] = path;
    if (step && step.length === 2) entity.move(step[0], step[1]);
  }
};
