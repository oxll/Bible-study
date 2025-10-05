export function setPosition(element, x, y) {
  element.style.position = "absolute";
  element.style.left = ` ${x}%`;
  element.style.top = `${y}%`;
  element.style.transform = "translate(-50%, -50%)";
}

export function equalsIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

export function replaceCharAt(str, i, value) {
  let chars = str.split("");
  chars[i] = value;
  return chars.join("");
}
