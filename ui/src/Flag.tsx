import { UserId } from "@lefun/core";
import { makeUseSelector, makeUseMakeMove } from "@lefun/ui";
import { G, GS } from "categorio-game";
export function Flag({ userId, answer }: { userId: UserId; answer: string }) {
  const useMakeMove = makeUseMakeMove<G>();
  const useSelector = makeUseSelector<GS>();
  let flagged: number = useSelector(
    (state) => state.board.playerVotes[answer][userId],
  );
  const makeMove = useMakeMove();
  console.log(flagged);
  return (
    <button
      onClick={() => makeMove("vote", { userId: userId, answer: answer })}
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_722_756)">
          <path
            d="M18.8856 12.7393L15.2515 9.10433L18.8856 12.7393ZM18.8856 12.7393C19.4634 13.3162 19.0964 14.286 18.3173 14.3694L18.8856 12.7393ZM18.5323 13.0931C18.803 13.3634 18.6383 13.8233 18.2751 13.8709L5.24967 20.1251C5.24967 20.1251 5.24967 20.1251 5.24967 20.1252C5.24964 20.2374 5.20843 20.3457 5.13385 20.4296C5.06186 20.5106 4.96361 20.5633 4.85664 20.5787L4.77916 20.5833C4.67129 20.5804 4.56774 20.5396 4.48691 20.4677C4.40595 20.3957 4.3532 20.2974 4.33781 20.1905L4.33301 20.1102V4.7919C4.33301 4.79187 4.33301 4.79185 4.33301 4.79183C4.33304 4.67959 4.37425 4.57127 4.44884 4.48739C4.52082 4.40643 4.61907 4.35369 4.72605 4.3383L4.80629 4.3335H18.208C18.591 4.3335 18.7994 4.77491 18.5764 5.06578L18.5231 5.12468L14.898 8.75082L14.5445 9.10433L14.898 9.45784L18.5319 13.0928L18.5323 13.0931Z"
            fill={!!flagged ? "#000000" : "#D40000"}
            stroke="#F3F3F3"
          />
          <path
            d="M4.79199 13.4165H18.2087L13.8962 9.104L18.2087 4.7915H4.79199V20.1248"
            stroke="#D40000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_722_756">
            <rect width="23" height="23" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
