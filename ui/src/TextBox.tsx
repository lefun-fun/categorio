import { useState } from "react";
import classNames from "classnames";

export default function TextBox({
  caption,
  text,
  readOnly,
  onChange,
  captionAlwaysOnTop = false,
}: {
  caption: string;
  text: string;
  readOnly: boolean;
  onChange?: (text: string) => void;
  captionAlwaysOnTop?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const captionOnTop = focused || text || captionAlwaysOnTop;

  return (
    <div className="relative">
      {captionOnTop && (
        <div
          className={classNames(
            "absolute -top-2 left-2 bg-white text-xs text-neutral-700 px-0.5",
            focused ? "text-primary" : "",
          )}
        >
          <div>{caption}</div>
        </div>
      )}
      <input
        type="text"
        placeholder={captionOnTop ? "" : caption}
        readOnly={readOnly}
        className={classNames(
          "px-3.5 w-full",
          "pb-1.5 pt-2",
          "border border-neutral-400 rounded-sm",
          "text-neutral-800 placeholder:text-neutral-700",
          "font-medium placeholder:font-light",
          "text-lg placeholder:text-base",
          readOnly
            ? "focus:caret-none focus: outline-none"
            : "focus:caret-primary focus:outline-primary",
        )}
        value={text}
        onChange={(e) => {
          if (onChange) {
            const { value } = e.target;
            onChange(value);
          }
        }}
        onFocus={() => !readOnly && setFocused(true)}
        onBlur={() => !readOnly && setFocused(false)}
      ></input>
    </div>
  );
}
