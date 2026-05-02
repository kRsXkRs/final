let data;

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
  });

document.getElementById("submitBtn").addEventListener("click", () => {
  let input = document.getElementById("numberInput");
  let num = parseInt(input.value);

  if (!num || num < 1 || num > 100) {
    alert("Enter a number between 1 and 100");
    return;
  }

  let categoryIndex = num % 4;

  let category;
  if (categoryIndex === 0) category = "yes";
  if (categoryIndex === 1) category = "no";
  if (categoryIndex === 2) category = "maybe";
  if (categoryIndex === 3) category = "wait";

  let answers = data[category];
  let randomAnswer = answers[Math.floor(Math.random() * answers.length)];

  let answerDiv = document.getElementById("answer");
  let overlay = document.getElementById("overlay");

  answerDiv.textContent = "";
  answerDiv.classList.remove("show");

  overlay.classList.add("show");

  setTimeout(() => {
    overlay.classList.remove("show");

    typeText(randomAnswer, answerDiv);

  }, 1500);
});

function typeText(text, element) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, 50);
    } else {
      element.classList.add("show");
    }
  }

  type();
}
