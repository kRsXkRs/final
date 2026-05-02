let data = null;

const aboutPage = document.getElementById("aboutPage");
const oraclePage = document.getElementById("oraclePage");
const answerPage = document.getElementById("answerPage");

const enterBtn = document.getElementById("enterBtn");
const oracleForm = document.getElementById("oracleForm");
const numberInput = document.getElementById("numberInput");

const answer = document.getElementById("answer");
const returnHint = document.getElementById("returnHint");
const overlay = document.getElementById("overlay");

fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;
  })
  .catch(error => {
    console.error("Could not load data.json:", error);
  });

enterBtn.addEventListener("click", () => {
  showPage(oraclePage);

  setTimeout(() => {
    numberInput.focus();
  }, 100);
});

oracleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  revealAnswer();
});

answerPage.addEventListener("click", () => {
  numberInput.value = "";
  answer.textContent = "";
  answer.classList.remove("reveal");
  returnHint.classList.remove("reveal");
  showPage(oraclePage);

  setTimeout(() => {
    numberInput.focus();
  }, 100);
});

function revealAnswer() {
  const num = Number(numberInput.value);

  if (!data) {
    alert("The book is still loading. Try again.");
    return;
  }

  if (!Number.isInteger(num) || num < 1 || num > 100) {
    alert("Enter a whole number between 1 and 100.");
    return;
  }

  const categories = ["yes", "no", "maybe", "wait"];
  const category = categories[num % 4];

  const possibleAnswers = data[category];
  const chosenAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

  overlay.classList.add("active");

  setTimeout(() => {
    answer.textContent = chosenAnswer;

    answer.classList.remove("reveal");
    returnHint.classList.remove("reveal");

    showPage(answerPage);

    void answer.offsetWidth;

    answer.classList.add("reveal");
    returnHint.classList.add("reveal");

    overlay.classList.remove("active");
  }, 1000);
}

function showPage(page) {
  aboutPage.classList.remove("active");
  oraclePage.classList.remove("active");
  answerPage.classList.remove("active");

  page.classList.add("active");
}
