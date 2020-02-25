import { debounce } from "debounce";
import { IScene, sceneManager } from ".";
import { gameDisplay } from "..";

const endHandler = (event: KeyboardEvent) => {
  if (event.code === "Space") sceneManager.goToNextScene();
};

const debouncedEndHandler = debounce(endHandler);

export const EndScene: IScene = {
  start() {
    gameDisplay.setOptions({ bg: "black" });
    gameDisplay.clear();
    // gameDisplay.drawText(1, 1, "You lost. Refresh or Press <F5> to try again");
    gameDisplay.drawText(1, 1, "@");
    document.addEventListener("keydown", debouncedEndHandler);
  },
  stop() {
    document.removeEventListener("keydown", debouncedEndHandler);
  }
};

export default EndScene;
