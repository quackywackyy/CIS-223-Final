const categoryDialog = document.getElementById("dialogC");
const categoryButton = document.getElementById("category-button");
const confirmButton = document.getElementById("confirm-button");

const difficultyDialog = document.getElementById("dialogD");
const difficultyButton = document.getElementById("difficulty-button");
const confirmDiffButton = document.getElementById("confirm-diff-button");

const startButton = document.getElementById("start");


startButton.addEventListener("click", () => {
   window.location.href = "quiz.html";
})

categoryButton.addEventListener("click", () => {
    categoryDialog.showModal();
})

confirmButton.addEventListener("click", () => {
    categoryDialog.close()
})

difficultyButton.addEventListener("click", () => {
    difficultyDialog.showModal();
})

confirmDiffButton.addEventListener("click", () => {
    difficultyDialog.close()
})

