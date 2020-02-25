import { v4 } from "uuid";
import { gameDisplay } from "..";
import { UI_START } from "../config";
import { drawTile, EMPTY, EMPTY_TILE, setTile } from "../map";
import { startBehaviour } from "../system";
import { IActionDictionary } from "../system/action";

export interface IStats {
  hp?: number;
  maxHP: number;
  mp?: number;
  maxMP?: number;
}

export interface IEntityProps {
  id?: string;
  x?: number;
  y?: number;
  glyph?: string;
  fg?: string;
  bg?: string;
  props?: IActionDictionary;
  stats?: IStats;
}

export class Entity {
  id: string;
  x: number;
  y: number;
  glyph: string;
  fg: string;
  bg: string;
  props: IActionDictionary;
  stats: IStats;

  constructor({
    id = v4(),
    x = 0,
    y = 0,
    glyph = "@",
    fg = "#0ff0f0",
    bg = "transparent",
    props = {},
    stats = { maxHP: 1 }
  } = {}) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.props = props;
    this.stats = stats;
    this.stats.hp = this.stats.maxHP;

    this.glyph = glyph;
    this.fg = fg;
    this.bg = bg;
    this.draw();
    this.drawStats();
  }

  draw = () => {
    setTile(this.x, this.y, this.id);
    gameDisplay.draw(this.x, this.y, this.glyph, this.fg, this.bg);
  };
  drawStats = () => {
    const { hp = "?", maxHP = "?", mp = "?", maxMP = "?" } = this.stats;
    if (this.props.controllable) {
      gameDisplay.drawText(0, UI_START, `♥ HP ${hp}/${maxHP}`);
      gameDisplay.drawText(0, UI_START + 1, `◆ MP ${mp}/${maxMP}`);
    }
  };
  clear = () => {
    setTile(this.x, this.y, EMPTY);
    gameDisplay.draw(this.x, this.y, EMPTY_TILE, null, null);
  };
  move = (x: number, y: number) => {
    setTile(this.x, this.y, EMPTY);
    drawTile(this.x, this.y);
    this.x = x;
    this.y = y;
    this.draw();
  };
  isAlive = () => {
    return this.stats.hp && this.stats.hp > 0;
  };
  damage = (n: number) => {
    if (this.stats.hp) this.stats.hp -= n;
    if (!this.isAlive()) this.clear();
  };
  act = () => {
    this.drawStats();
    if (!this.isAlive()) return;
    this.draw();
    startBehaviour(this);
  };
}
