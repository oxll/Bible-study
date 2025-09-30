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

const p = document.createElement("p");
p.innerHTML = verse.replace(/[a-z]/gi, "_");
document.body.appendChild(p);

let index = 0;
index = getNextValidIndex();

document.addEventListener("keydown", (event) => {
  if (index === -1) return;

  const key = event.key;

  if (key.length > 1) return;

  const expected = verse[index];

  if (!equalsIgnoreCase(key, expected)) return;

  let chars = p.textContent.split("");
  chars[index] = verse[index];

  p.textContent = chars.join("");
  index = getNextValidIndex();
});

function getNextValidIndex() {
  const letters = /[a-z]/i;

  do {
    index++;
    if (index >= verse.length) return -1;
  } while (!letters.test(verse[index]));

  return index;
}

function equalsIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}
