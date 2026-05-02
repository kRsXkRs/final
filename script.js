let data;

fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;
  });

document.getElementById("submitBtn").addEventListener("click", () => {
  let num = parseInt(document.getElementById("numberInput").value);

  if (!num) {
    alert("Enter a number");
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
  answerDiv.textContent = randomAnswer;

  answerDiv.classList.remove("show");

  setTimeout(() => {
    answerDiv.classList.add("show");
  }, 100);
});
