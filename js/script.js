/** TODO: barely different process for reference, split words differently:
 * 1 Corinthians 13:4-7 is 3 'words': "1 Corinthians", "13", "4-7"
 * (only need type 4 7)
 * 
 *^^^ fix the above by loading in verses: get book, chapter, and verse(s)
 * directly from file
 * 
 */

import {
  equalsIgnoreCase,
  getFirstIndex,
  getNextIndex,
  setPosition,
} from "./utils/_index.js";

const verse =
  "⁴ Love is patient, love is kind. It does not envy, " +
  "it does not boast, it is not proud. " +
  "⁵ It does not dishonor others, " +
  "it is not self-seeking, it is not easily angered, " +
  "it keeps no record of wrongs. " +
  "⁶ Love does not delight in evil but " +
  "rejoices with the truth. " +
  "⁷ It always protects, always trusts, " +
  "always hopes, always perseveres.\n\n" +
  "1 Corinthians 13:4-7";

const words = verse.split(" ");
let numWords = getFirstIndex(words, isTypable) + 1;

let index = getFirstIndex(verse, isTypable);

const typingArea = document.createElement("div");
typingArea.id = "typingArea";
setPosition(typingArea, 50, 50);
document.body.appendChild(typingArea);

generateTypingArea();

document.addEventListener("keydown", (event) => {
  handleKeyPress(event.key);
});

function generateTypingArea() {
  [...verse].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;

    span.classList.add(isTypable(char) ? "hint" : "fixed");

    if (i >= getWords(numWords).length) {
      span.classList.add("hidden");
      span.classList.replace("hint", "untyped");
    }

    typingArea.appendChild(span);
  });
}

function handleKeyPress(key) {
  if (index === -1) return;

  const expected = verse[index];
  if (!equalsIgnoreCase(key, expected)) return;

  const span = typingArea.children[index];
  span.classList.replace("hint", "fixed");
  span.classList.replace("untyped", "fixed");

  index = getNextIndex(index, verse, isTypable);

  if (index >= getWords(numWords).length) {
    addNextWord();
  }
}

function addNextWord() {
  numWords = getNextIndex(numWords - 1, words, isTypable) + 1;

  const spans = Array.from(typingArea.children);
  const end = getWords(numWords).length;
  const slice = spans.slice(0, end);

  for (const span of slice) {
    span.classList.remove("hint", "hidden");

    const char = span.textContent;

    if (!isTypable(char)) continue;

    if (!span.classList.contains("fixed")) {
      span.classList.add("hint");
      continue;
    }

    span.classList.replace("fixed", "untyped");
  }

  index = getFirstIndex(verse, isTypable);
}

function getWords(numWords) {
  return words.slice(0, numWords).join(" ");
}

function isTypable(char) {
  return /[a-z0-9]/i.test(char);
}
