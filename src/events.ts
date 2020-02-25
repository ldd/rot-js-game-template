import { Entity } from "./entity";
import { save } from "./game";
import { IGameState, load } from "./game/save";
import { getAllTiles, getSeed } from "./map";
import { makeEntitiesHandler } from "./system";

let saveHandler: (e: KeyboardEvent) => void;
let entitiesHandler: (e: KeyboardEvent) => void;

/** Add Keyboard events to save game and move around entities. */
function addKeyboardEvents(
  entities: Entity[],
  initializer: (state: IGameState) => void
) {
  removeKeyboardEvents();

  saveHandler = (e: KeyboardEvent) => {
    if (e.code === "KeyL") load(initializer);
    if (e.code === "KeyP")
      save({ entities, tiles: getAllTiles(), seed: getSeed() });
  };
  entitiesHandler = makeEntitiesHandler(entities);

  document.addEventListener("keydown", saveHandler);
  document.addEventListener("keydown", entitiesHandler);
}

/** Remove all keyboard events. */
function removeKeyboardEvents() {
  document.removeEventListener("keydown", saveHandler);
  document.removeEventListener("keydown", entitiesHandler);
}

/** Gets delta change in x and y depending on the key pressed. */
export function getNextCoords(code: string) {
  let [dX, dY] = [0, 0];
  if (code === "ArrowRight" || code === "KeyD") dX = 1;
  if (code === "ArrowLeft" || code === "KeyA") dX = -1;
  if (code === "ArrowUp" || code === "KeyW") dY = -1;
  if (code === "ArrowDown" || code === "KeyS") dY = 1;
  return [dX, dY];
}
export { addKeyboardEvents, removeKeyboardEvents };
