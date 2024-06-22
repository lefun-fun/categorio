import { useEffect } from "react";

function useFonts() {
  // Add the google font. This is a bit hacky but we have no other way to control the
  // "outer" HTML.
  useEffect(() => {
    const parent = document.getElementsByTagName("head")[0];
    parent.insertAdjacentHTML(
      "beforeend",
      `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
      `,
    );
  }, []);
}

export { useFonts };
