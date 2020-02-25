import { Display } from "rot-js";
import { DisplayOptions } from "rot-js/lib/display/types";
import { FONT_SIZE, HEIGHT, WIDTH } from "../config";
import { tileMap } from "./displayTileMap";

/** Get options for a purely ASCII-based display experience. */
function getAsciiOptions(): Partial<DisplayOptions> {
  return {
    width: WIDTH,
    height: HEIGHT,
    fontSize: FONT_SIZE
  };
}

/** Get options for a graphic (tile-based) display experience. */
function getTilesetOptions(): Promise<Partial<DisplayOptions>> {
  return new Promise((resolve, reject) => {
    const tileSet = document.createElement("img");
    tileSet.src = "assets/spritesheet.png";
    tileSet.style.imageRendering = "pixelated";
    tileSet.onload = () =>
      resolve({
        ...getAsciiOptions(),
        layout: "tile",
        bg: "transparent",
        tileSet,
        tileWidth: 16,
        tileHeight: 16,
        tileMap
      });
    tileSet.onerror = reject;
  });
}
/** Initialize ROT.js display. */
async function initDisplay({ useTilesets = true } = {}) {
  const options = useTilesets ? await getTilesetOptions() : getAsciiOptions();
  const display = new Display(options);

  const gameContainer = display.getContainer();
  if (!gameContainer) return display;

  const containerDiv = document.getElementById("game-container");
  if (!containerDiv) return display;
  containerDiv.innerHTML = "";
  containerDiv.appendChild(gameContainer);

  return display;
}

export { initDisplay };
