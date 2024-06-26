import { render } from "@lefun/dev-server";
import { CategorioBoard, game } from "categorio-game";

// @ts-expect-error abc
import { messages as en } from "./locales/en/messages";
// @ts-expect-error abc
import { messages as fr } from "./locales/fr/messages";

render<CategorioBoard>({
  board: async () => {
    const { default: Board } = await import("./Board");
    // @ts-expect-error the import is there even if TS does not see it!
    await import("./index.css");
    return <Board />;
  },
  gameDef: game,
  messages: { en, fr },
});
