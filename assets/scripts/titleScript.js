// trivia API I wish to use: https://the-trivia-api.com/
// e.g. https://the-trivia-api.com/api/questions?limit=10&categories=science,film_and_tv
/* Quacky Wacky CIS-223 Final Project ---- 10/29/25
For my final project, I want to create a small quiz game that utilizes Fetch to retrieve trivia questions, answers, and incorrect answers based on difficulty, category and type.

A user will first be met with a screen that houses the settings to the game, as well as the start button. Ideas for the settings are category, difficulty, and maybe more.
Once the start button is pressed, the quiz will begin. Each quiz will contain X-X questions based on the settings chosen. I haven't decided if there will be a time, but I plan on there being a hint button
The user has three lives throughout the quiz, and whenever they get a question wrong, they lose one. Maybe a life refill half way through the quiz. 
Once the user completes the quiz, their stats will display for the [run], such as time taken, questions failed, maybe others like fastest question solved, question hat took the longest, hints used, etc. WHatever I find fun and have time for



SETTINGS: I will add settings that you can change before the game begins. These settings will change the API url used to fetch the trivia
ANSWERS: There will be 4 answers per question, but I wish to make it adaptable in case I have true or false questions. I'll reset the CSS properties of each question box, and change the content whenever a new round starts

HINTS (possible): If time allows, I want a hint system that will rid of two of the incorrect options from the pool
TIMER (possible): An option to make each question timed so there is limited time to guess.
MUSIC/SOUND EFFECTS (possible): I want music and sound effects so the whole page isn't dull

Other Notes: ---- 11/2/25
Want to figure out if there's an easier/better way to structure this project. Mainly with having only 1 script/html/css file so I don't need to figure out a way to export the API link
If I stick with this structure, I will need to figure out how to export the api url into the other script file.

*/


const categoryDialog = document.getElementById("dialogC");
const categoryButton = document.getElementById("category-button");
const confirmButton = document.getElementById("confirm-button");

const difficultyDialog = document.getElementById("dialogD");
const difficultyButton = document.getElementById("difficulty-button");
const confirmDiffButton = document.getElementById("confirm-diff-button");

const startButton = document.getElementById("start");



startButton.addEventListener("click", async () => { // this event listener will collect all the values of the check marks/radios

    const categories = document.querySelectorAll("input[type='checkbox']:checked"); // mdn help me find this cool trick
    const difficultyRadio = document.querySelectorAll("input[name='diff']:checked"); 

    const difficulty = difficultyRadio[0].value;
    const category = await formatCats(categories);
    console.log(category + difficulty); // this does log but the page changes before it does

})


// button events for opening and closing the dialogs
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

// simple function that gives us a formatted string of the categories (ripe for the API request)
async function formatCats(categories) {
    let data = [];
    for (cat of categories) {
        data.push(cat.value);
    }
    return data.join(",");
}

