type IActionType = "controllable" | "movable" | "damageable";
// | "craftable"
// | "tradable"
// | "plantable"
// | "harvestable"
// | "growable"
// | "sleepable"
// | "edible"
// | "hungerable";

type IActionProduce = { frameName: string; quantity: number };

type IActionEntry =
  | boolean
  | {
      input?: IActionProduce[];
      output?: IActionProduce[];
      time?: number;
    };

type IActionDictionary = { [K in IActionType]?: IActionEntry };

export { IActionType, IActionDictionary };
