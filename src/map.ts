import { Map as rotMap, RNG } from "rot-js";
import { gameDisplay } from ".";
import { MAP_HEIGHT, WIDTH } from "./config";
import { Entity } from "./entity";
import { activeEntityMap } from "./system";
import { IActionType } from "./system/action";
import { randomInteger } from "./utils";

export const [EMPTY, WALL, ENTITY] = [0, 1, 2];
export const [EMPTY_TILE, WALL_TILE] = [".", "#"];

export type TileValue = string | number;

let seed: number;
export const getSeed = () => seed;
let tiles: TileValue[][];
export const getAllTiles = () => tiles;

let tileMap: { [key: string]: TileValue };
let entityMap: Map<string, string>;

/** Get all other entities (based on your own x & y coords). */
export function getOtherEntities(us: Entity, prop: IActionType): Entity[] {
  return Array.from(entityMap)
    .filter(
      ([, entityId]) => entityId !== us.id && activeEntityMap.has(entityId)
    )
    .map(([, entityId]) => activeEntityMap.get(entityId))
    .filter((entity): entity is Entity => !!entity?.props[prop]);
}

/** Get entity at given coordinates. */
export function getEntityAt(x: number, y: number): Entity | undefined {
  const entityId = entityMap.get(`${x},${y}`);
  if (!entityId) return;
  return activeEntityMap.get(entityId);
}

/** Initialize ROT.js Map with a seed. */
export function initMap(
  sourceSeed = randomInteger(),
  sourceTiles: TileValue[][] = new Array(WIDTH).fill(null).map(() => [])
) {
  seed = sourceSeed;
  RNG.setSeed(seed);
  const digger = new rotMap.Digger(WIDTH, MAP_HEIGHT);
  tiles = sourceTiles;
  tileMap = {};
  entityMap = new Map();
  digger.create(setTile);
}

/** Set a tile with x, y coordinates to a value. */
export function setTile(x: number, y: number, value: TileValue) {
  tiles[x][y] = value;
  const key = `${x},${y}`;
  tileMap[key] = value;
  if (typeof value === "string") entityMap.set(key, value);
  if (value === EMPTY && entityMap.has(key)) entityMap.delete(key);
}

/** Get empty tile coordinates. */
export function getEmptyTile(): [number, number] {
  const emptyEntries = Object.entries(tileMap).filter(([k, v]) => v === EMPTY);
  const index = Math.floor(RNG.getUniform() * emptyEntries.length);
  const [key] = emptyEntries[index];
  const [x, y] = key.split(",").map(Number);
  return [x, y];
}

/** Given x and y coordinates, returns true if a tile is {@link EMPTY}. */
export function isEmptyTile(x: number, y: number) {
  const tile = tileMap[`${x},${y}`];
  return tile === EMPTY;
}

/** Given x and y coordinates, returns true if a tile is not {@link WALL}. */
export function isFreeTile(x: number, y: number) {
  const tile = tileMap[`${x},${y}`];
  return tile !== WALL;
}

/** Draw a tile. For now, it only differentiates between walls and non-walls. */
export function drawTile(x: number, y: number) {
  const tile = tiles[x][y] !== WALL ? EMPTY_TILE : WALL_TILE;
  gameDisplay.draw(x, y, tile, null, null);
}

/** Draw all tiles. */
export function drawMap() {
  tiles.forEach((row, x) => row.forEach((_tile, y) => drawTile(x, y)));
}
