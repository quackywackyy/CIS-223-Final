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
// variables that are global
let life = 3;
let triviaQuestions;

const categoryDialog = document.getElementById("dialogC");
const categoryButton = document.getElementById("category-button");
const confirmButton = document.getElementById("confirm-button");

const difficultyDialog = document.getElementById("dialogD");
const difficultyButton = document.getElementById("difficulty-button");
const confirmDiffButton = document.getElementById("confirm-diff-button");

const startButton = document.getElementById("start");



startButton.addEventListener("click", async () => { // this event listener will collect all the values of the check marks/radios AND change the page layout to start the quiz

    const categories = document.querySelectorAll("input[type='checkbox']:checked"); // mdn help me find this cool trick
    const difficultyRadio = document.querySelectorAll("input[name='diff']:checked"); 

    const difficulty = difficultyRadio[0].value;
    const categoryList = await formatCats(categories);

    // make the menu invisible and the questions visible by removing and adding the appropriate classes
    document.getElementById("menu").classList.add("invisible-div");
    document.getElementById("question-box").classList.remove("invisible-div");

    triviaQuestions = await getQuestions(categoryList, difficulty);
    
    quizQuestion(0); // not permanent
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


// API fetch call to get our data
// base from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getQuestions(categories, difficulty) {
  const url = `https://the-trivia-api.com/api/questions?limit=10&categories=${categories}&difficulty=${difficulty}`;
  try {
    const response = await fetch(url); // the request to the API
    if (!response.ok) { // if the request comes back invalid (will do more stuff here)
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json(); // convert the json data to objects and arrays
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

// start of quiz code



class Answer {
    answer = "";
    card;
    isRight = false;

    constructor(answerText, number, right) {
        this.answer = answerText;
        this.card = document.getElementById(`question-${number}`); // retrieve the card based on the number and set this.card to it
        this.isRight = right;
    
    } 

    setCard() { // set the card in the question interface to be this answer
        this.card.addEventListener("click", this.whenClicked.bind(this), { once: true}); // add an event listener to the card that will only activate once. The .bind allows us to call the function while keeping the this context(?)
        this.card.textContent = this.answer;
        // some css class stuff that I haven't created yet
    }

    whenClicked() {
        if (this.isRight == true) {
            // if it's RIGHT


            this.card.classList.remove("question-hover");
    

        } else {
            //if it's WRONG

            this.card.classList.remove("question-hover");
            
            loseLife();
        }
       // more css stuff that I haven't created yet 
    }

    //

}

function loseLife() { // function to lose a life
    console.log("lost a life!");
}

// The main logic and code | putting it in a function so we can call it later
async function quizGame() {
    if (triviaQuestions) {
       
        
    } else { // if we failed to retrieve the data, tell them to try again
        document.getElementById("menu").classList.add("invisible-div"); 
        document.getElementById("question-box").classList.add("invisible-div");
        document.getElementById("try-again").classList.remove("invisible-div");

    }
}


function quizQuestion(questionNumber) {
    const question = triviaQuestions[questionNumber]; // so the handling of questions is easier
    const rightAnswer = question.correctAnswer; // store a variable so we know which answer is the right one
    let answers = new Array(); // create a new array to hold the answers
    
    answers.push(question.correctAnswer, question.incorrectAnswers[0], question.incorrectAnswers[1], question.incorrectAnswers[2]); // store the answers into the array
    
    answers.sort(); // sort the answers in alphabetical order to jumble them up.

    document.getElementById("question-title").textContent = question.question // set the question title
    for (let index = 0; index < answers.length; index++) {
        const answer = new Answer(
            answers[index], 
            index+1, 
            rightAnswer === answers[index] ? true : false
        ); // create a new question using the array's current index's value. Set the answer number to index+1 since index is 0-3 and answer number 1-4. Quick and cool use of the ternary operator to set the right answer to true if answer[index] is the correct answer.
        
        answer.setCard();
    }

}


