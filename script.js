let data;

const aboutPage = document.getElementById("aboutPage");
const oraclePage = document.getElementById("oraclePage");
const answerPage = document.getElementById("answerPage");
const enterBtn = document.getElementById("enterBtn");
const submitBtn = document.getElementById("submitBtn");
const numberInput = document.getElementById("numberInput");
const answerDiv = document.getElementById("answer");
const overlay = document.getElementById("overlay");

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
  });

enterBtn.addEventListener("click", () => {
  showPage(oraclePage);
});

submitBtn.addEventListener("click", revealAnswer);

numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    revealAnswer();
  }
});

answerPage.addEventListener("click", () => {
  numberInput.value = "";
  answerDiv.textContent = "";
  showPage(oraclePage);
});

function revealAnswer() {
  let num = parseInt(numberInput.value);

  if (!num || num < 1 || num > 100) {
    alert("Enter a number between 1 and 100");
    return;
  }

  if (!data) {
    alert("The book is still loading.");
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

  overlay.classList.add("show");

  setTimeout(() => {
    answerDiv.textContent = randomAnswer;
    showPage(answerPage);
    overlay.classList.remove("show");
  }, 1200);
}

function showPage(pageToShow) {
  aboutPage.classList.remove("show");
  oraclePage.classList.remove("show");
  answerPage.classList.remove("show");

  pageToShow.classList.add("show");
}
