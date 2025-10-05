import {
  setPosition,
  equalsIgnoreCase,
  replaceCharAt,
} from "./utils/_index.js";

const verse =
  "4 Love is patient, love is kind. " +
  "It does not envy, it does not boast, " +
  "it is not proud. 5 It does not dishonor others, " +
  "it is not self-seeking, it is not easily angered, " +
  "it keeps no record of wrongs. " +
  "6 Love does not delight in evil but " +
  "rejoices with the truth. " +
  "7 It always protects, always trusts, " +
  "always hopes, always perseveres.";

const words = verse.split(" ");

const p = document.createElement("p");
setPosition(p, 50, 50);
document.body.appendChild(p);

let section, index, expectedLetter;

let numWords = 0;
updateSection();

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!equalsIgnoreCase(key, expectedLetter)) return;

  p.textContent = replaceCharAt(p.textContent, index, expectedLetter);

  index = p.textContent.indexOf("_");
  expectedLetter = section[index];

  if (index === -1) {
    updateSection(numWords);
  }
});

function updateSection() {
  do {
    numWords++;
  } while (!/[a-z]/i.test(words[numWords - 1]));

  section = getWords(numWords);

  p.textContent = section.replace(/[a-z]/gi, "_");

  index = p.textContent.indexOf("_");
  expectedLetter = section[index];
}

function getWords(numWords) {
  return words.slice(0, numWords).join(" ");
}
