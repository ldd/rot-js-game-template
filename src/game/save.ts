import { IEntityProps } from "../entity";
import { TileValue } from "../map";

export interface IGameState {
  seed?: number;
  entities: IEntityProps[];
  tiles?: TileValue[][];
}
/** Save the game state to localStorage (under the key '@gameState'). */
export function save({ entities, tiles, seed }: IGameState) {
  const gameState: IGameState = { entities, tiles, seed };
  localStorage.setItem("@gameState", JSON.stringify(gameState));
}

/**
 * Load the game state from localStorage (under the key '@gameState').
 * Then call the given callback (typically to restart the game)
 */
export function load(callback: (gameState: IGameState) => void) {
  const gameState: IGameState = JSON.parse(
    localStorage.getItem("@gameState") || ""
  );
  callback(gameState);
}
