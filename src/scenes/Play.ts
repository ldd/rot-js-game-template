import { debounce } from "debounce";
import { Engine } from "rot-js";
import { IScene } from ".";
import { gameDisplay } from "..";
import defaultEntities from "../../data/entities.json";
import { Entity } from "../entity";
import { addKeyboardEvents } from "../events";
import { initEngine } from "../game";
import { drawMap, getEmptyTile, initMap } from "../map";

export let gameEngine: Engine;

export const PlayScene: IScene = {
  start(state = { entities: defaultEntities }) {
    gameDisplay.clear();
    // initialize the map's tiles
    initMap(state.seed, state.tiles);
    // initialize the engine with passed entities
    const allEntities = state.entities.map(entityProps => {
      const [x, y] = getEmptyTile();
      return new Entity({ x, y, ...entityProps });
    });
    gameEngine = initEngine(allEntities);
    // initialize events with passed entities
    addKeyboardEvents(allEntities, debouncedStart);

    // finally, draw everything to our display
    drawMap();
    gameEngine.start();
  },
  stop() {
    gameEngine._scheduler.clear();
  }
};

const debouncedStart = debounce(PlayScene.start);

export default PlayScene;
