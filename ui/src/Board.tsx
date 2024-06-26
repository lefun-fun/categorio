import "./index.css";

import {
  makeUseSelector,
  // makeUseSelectorShallow,
  useDispatch,
} from "@lefun/ui";

import classNames from "classnames";

import { useState } from "react";

import { B, PB, write, Phase } from "categorio-game";

import { MessageDescriptor } from "@lingui/core";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useFonts } from "./useFonts";

const useSelector = makeUseSelector<B, PB>();
// const useSelectorShallow = makeUseSelectorShallow<B, PB>();

const phaseNames: Record<Phase, MessageDescriptor> = {
  write: msg`Write`,
  review: msg`Review`,
};

function Header() {
  const round = useSelector((state) => state.board.round);
  const phase = useSelector((state) => state.board.phase);
  const letter = useSelector((state) => state.board.letter);

  const { _ } = useLingui();

  return (
    <div className="flex p-1.5 pb-2">
      <div className="mr-auto">
        <div className="flex flex-col leading-5 text-neutral-700">
          <Trans>Round {round + 1}</Trans>
          <span className="text-primary font-medium">
            {_(phaseNames[phase])}
          </span>
        </div>
      </div>
      <div>
        <div
          className={`h-10 w-10 text-4xl font-medium
        bg-white border border-black text-neutral-800 rounded shadow-md
        flex items-center justify-center`}
        >
          <div>{letter}</div>
        </div>
      </div>
      <div className="ml-auto text-3xl text-neutral-500">123</div>
    </div>
  );
}

function AnswerInput({ index }: { index: number }) {
  const category = useSelector((state) => state.board.categories[index]);
  const answer = useSelector(
    (state) => state.playerboard.answers[state.board.round][index],
  );

  const [newAnswer, setNewAnswer] = useState(answer);

  const empty = newAnswer === "";

  const dispatch = useDispatch();

  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {(focused || !empty) && (
        <div
          className={classNames(
            "absolute -top-2 left-2 bg-white text-xs text-neutral-700 px-0.5",
            focused ? "text-primary" : "",
          )}
        >
          <div>{category}</div>
        </div>
      )}
      <input
        type="text"
        placeholder={focused ? "" : category}
        className={classNames(
          "px-3.5 w-full",
          "pb-1.5 pt-2",
          "border border-neutral-400 rounded-sm",
          "text-neutral-800 placeholder:text-neutral-700",
          "focus:caret-primary focus:outline-primary",
          "font-medium placeholder:font-light",
          "text-lg placeholder:text-base",
        )}
        value={newAnswer}
        // figure out a way to now dispatch for every stroke
        onChange={(e) => {
          const { value } = e.target;
          setNewAnswer(value);
          dispatch(write({ index, answer: value }));
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
    </div>
  );
}

function Board() {
  useFonts();

  const numCategories = useSelector((state) => state.board.categories.length);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <div className="w-full max-w-96 h-full max-h-vmd bg-neutral-50 flex flex-col rounded">
        <Header />
        <div className="flex-1 flex flex-col justify-between p-2 vmd:p-3 space-y-3.5 overflow-y-auto">
          {Array(numCategories)
            .fill(null)
            .map((_, index) => (
              <AnswerInput key={index} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
