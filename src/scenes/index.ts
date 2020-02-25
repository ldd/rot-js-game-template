import { IGameState } from "../game/save";
// import BootScene from "./Boot";
import EndScene from "./End";
import PlayScene from "./Play";

export let currentScene: IScene;

export interface IScene {
  start: (state?: IGameState) => void;
  stop: (state?: IGameState) => void;
}

/** E. */
export const sceneManager = {
  // scenes: [BootScene, PlayScene, EndScene],
  scenes: [PlayScene, EndScene],
  index: 0,
  goToNextScene() {
    this.stopCurrentScene();
    this.index = (this.index + 1) % this.scenes.length;
    this.startCurrentScene();
  },
  startCurrentScene() {
    const scene = this.scenes[this.index];
    scene.start();
  },
  stopCurrentScene() {
    const scene = this.scenes[this.index];
    scene.stop();
  }
};
