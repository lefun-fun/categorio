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
  userIds: UserId[];
  // Info of the current round.
  answers?: { [userId: UserId] : string[]; };
  round: number;
  roundStep: number;
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
const [REVIEW, review] = createMove<WritePayload>("review");

const moves: Moves<B, PB> = {
  [WRITE]: {
    executeNow({ board, playerboard, payload }) {
      const { answer, index } = payload as WritePayload;
      const { round } = board;
      playerboard.answers[round][index] = answer;

      //Go to review phase when any player has entered 10 answers
      if (playerboard.answers[round].some(a => a !== "")) {
        board.phase = "review" as const;
     }
    },
  },
  [REVIEW]: {
    executeNow({ board, playerboard, userId }) {
      board.answers = {};
      board.answers[userId] = playerboard.answers[board.round];
    },
    }
};

const game: GameDef<B, PB> = {
  initialBoards: ({ players }) => {
    const board = {
      categories: CATEGORIES,
      round: 0,
      roundStep: 0,
      userIds: players,
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

export { game, write, review };
