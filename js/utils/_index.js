export function setPosition(element, x, y) {
  element.style.position = "absolute";
  element.style.left = ` ${x}%`;
  element.style.top = `${y}%`;
  element.style.transform = "translate(-50%, -50%)";
}

export function equalsIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

export function getFirstIndex(arr, test) {
  let i = 0;
  while (i < arr.length && !test(arr[i])) i++;
  return i < arr.length ? i : -1;
}

export function getNextIndex(start, arr, test) {
  let i = start + 1;
  while (i < arr.length && !test(arr[i])) i++;
  return i < arr.length ? i : -1;
}
