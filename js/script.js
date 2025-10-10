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
  "always hopes, always perseveres.";
// + "\n\n1 Corinthians 13:4-7";

let sectionStartIndex = 0;

let isReviewing = false;

const words = verse.split(" ");
let wordCount = getFirstIndex(words, isTypable) + 1;

let cursor = getFirstIndex(verse, isTypable);

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

    if (i >= getWords(wordCount).length) span.classList.add("hidden");

    typingArea.appendChild(span);
  });
}

function handleKeyPress(key) {
  if (cursor === -1) return;

  const expected = verse[cursor];
  if (!equalsIgnoreCase(key, expected)) return;

  const span = typingArea.children[cursor];
  span.classList.replace("hint", "fixed");
  span.classList.replace("untyped", "fixed");

  let nextCursor = getNextIndex(cursor, verse, isTypable);
  let nextSpan = typingArea.children[nextCursor];

  if (!nextSpan.classList.contains("hidden")) {
    cursor = nextCursor;
    return;
  }

  const completedSection =
    verse[cursor + 1] === "," || verse[cursor + 1] === ".";
  if (completedSection) {
    if (isReviewing || sectionStartIndex === 0) {
      isReviewing = false;
      addNextSection();
    } else {
      isReviewing = true;
      addNextWord();
    }

    return;
  }

  addNextWord();
}

function addNextWord() {
  if (!isReviewing) {
    wordCount = getNextIndex(wordCount - 1, words, isTypable) + 1;
  }

  const spans = Array.from(typingArea.children);
  const start = isReviewing ? 0 : sectionStartIndex;
  const end = getWords(wordCount).length;
  const slice = spans.slice(start, end);

  for (const span of slice) {
    span.classList.remove("hidden");

    if (!isTypable(span.textContent)) continue;

    span.classList.replace("fixed", "untyped");
  }

  cursor = getNextIndex(start - 1, verse, isTypable);
}

function addNextSection() {
  wordCount = getNextIndex(wordCount - 1, words, isTypable) + 1;

  const spans = Array.from(typingArea.children);
  const end = getWords(wordCount).length;
  const slice = spans.slice(0, end);

  sectionStartIndex = [...typingArea.children].findIndex(
    (span, i) =>
      i > cursor &&
      span.classList.contains("hidden") &&
      span.textContent !== " "
  );

  for (const [i, span] of slice.entries()) {
    if (isTypable(verse[i])) span.classList.replace("fixed", "untyped");

    if (i < sectionStartIndex) {
      span.classList.add("hidden");
    } else {
      span.classList.remove("hidden");
    }
  }

  cursor = getNextIndex(cursor, verse, isTypable);
}

function getWords(wordCount) {
  return words.slice(0, wordCount).join(" ");
}

function isTypable(char) {
  return /[a-z0-9]/i.test(char);
}
