import { UserId } from "@lefun/core";
import { createMove, GameDef, Moves, PlayerMove } from "@lefun/game";

const NUM_ROUNDS = 3;

// Hard-code some categories for now.
const CATEGORIES = [
  "Something You Can Drink",
  "Place With Lots of People",
  "Horror Movies",
  "Animal",
  "Small Fruit",
  "Thing That Is Frozen",
  "Flower",
  "Color",
  "Something you write with",
  "In a House",
  // Should we use 10 or 12?
  // "Something Blue",
  // "Pop Artist",
];

const NUM_CATEGORIES = CATEGORIES.length;

export type Phase = "write" | "review";

export type B = {
  categories: string[];

  // Info of the current round.
  round: number;
  phase: Phase;
  letter: string;
};

export type PB = {
  // An array of answers for each round.
  answers: string[][];
};

type WritePayload = {
  index: number;
  answer: string;
};

const [WRITE, write] = createMove<WritePayload>("write");

const moves: Moves<B, PB> = {
  [WRITE]: {
    executeNow({ board, playerboard, payload }) {
      const { answer, index } = payload as WritePayload;
      const { round } = board;
      playerboard.answers[round][index] = answer;
    },
  },
};

const game: GameDef<B, PB> = {
  initialBoards: ({ players }) => {
    const board = {
      categories: CATEGORIES,
      round: 0,
      // TODO No letter to start with, then a count them and then only we pick the letter.
      letter: "A",
      phase: "write" as const,
    };

    const playerboards: Record<UserId, PB> = {};

    for (const userId of players) {
      playerboards[userId] = {
        answers: Array(NUM_ROUNDS).fill(Array(NUM_CATEGORIES).fill("")),
      };
    }

    return { board, playerboards };
  },
  moves,
  minPlayers: 1,
  maxPlayers: 10,
};

export { game, write };
