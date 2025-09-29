const input = document.createElement("input");
input.classList.add("centered");
document.body.appendChild(input);

const p = document.createElement("p");
p.classList.add("centered");
p.innerHTML = "hi";
document.body.appendChild(p);

input.addEventListener("input", () => {
  input.value += input.value;
});
