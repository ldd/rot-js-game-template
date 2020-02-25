import { Display } from "rot-js";
import { initDisplay } from "./game";
import { sceneManager } from "./scenes";

let gameDisplay: Display;

/**
 * Initialize the display and start the first scene.
 */
async function init() {
  gameDisplay = await initDisplay();
  sceneManager.startCurrentScene();
}

init();

export { gameDisplay };
