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

11/12/25
added timer div, will edit color and width to shrink it down to 15 seconds

11/30/25
Lot of refactoring done, but unfortunately a lot of the code may be obsolete
*/
const timerBox = document.getElementById("timer-box");
const gameInfo = document.getElementById("information-box");


const categoryDialog = document.getElementById("dialogC");
const categoryButton = document.getElementById("category-button");
const confirmButton = document.getElementById("confirm-button");

const difficultyDialog = document.getElementById("dialogD");
const difficultyButton = document.getElementById("difficulty-button");
const confirmDiffButton = document.getElementById("confirm-diff-button");

const startButton = document.getElementById("start");

// button events for opening and closing the dialogs
categoryButton.addEventListener("click", () => {
    categoryDialog.showModal();
})

confirmButton.addEventListener("click", () => {
    categoryDialog.close();
})

difficultyButton.addEventListener("click", () => {
    difficultyDialog.showModal();
})

confirmDiffButton.addEventListener("click", () => {
    difficultyDialog.close();
})


// Global Variables (here so I don't have to scroll up) Quiz code
let questionsRight = 0; // just make this the number of questions IMPORTANT
let timeToAnswer = 15; // time to answer questions in seconds

// non-modifiable variables. I don't like all these variables, but all I'm trying to do is make it functional
let currentNumber = 1;
let triviaQuestions;
let currentTimeout;
let gameStillGoing = true;
let answerList = new Array(); // create a new array to hold the answers

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
        this.card.textContent = this.answer;
        // some css class stuff that I haven't created yet
    }
} // answer object to represent each answer


let categories; // global categories variable so we can access that at the end of the game
let difficulty;
// listeners
startButton.addEventListener("click", async () => { // this event listener will collect all the values of the check marks/radios AND change the page layout to start the quiz

    categories = document.querySelectorAll("input[type='checkbox']:checked"); // mdn help me find this cool trick
    const difficultyRadio = document.querySelectorAll("input[name='diff']:checked"); 

    difficulty = difficultyRadio[0].value;
    const categoryList = await formatCats(categories);

    // make the menu invisible and the questions visible by removing and adding the appropriate classes

    triviaQuestions = await getQuestions(categoryList, difficulty);

    document.getElementById("menu").classList.add("invisible-div");
    document.getElementById("question-box").classList.remove("invisible-div");


    askQuestion(); // ask the first question, starting the chain that will start our game


    // putting the event listeners after the question creation so answers isn't undefined
    document.getElementById(`question-1`).addEventListener("click", whenClicked.bind(null, 1)); // using bind so we can pass parameters into it
    document.getElementById(`question-2`).addEventListener("click", whenClicked.bind(null, 2));
    document.getElementById(`question-3`).addEventListener("click", whenClicked.bind(null, 3));
    document.getElementById(`question-4`).addEventListener("click", whenClicked.bind(null, 4));

})


// Major changes needed. Since the event listeners were being added every time we made a card, it caused the cards to retain their listeners. SOOO we are going to find a way to make the listeners last forever.

function whenClicked(cardNo) { // this gets really confusing, buckle up
    currentNumber++;
    if (answerList[cardNo - 1].isRight === true) { // if it's RIGHT; see line 195
        questionsRight++; // increment the questions right
        clearTimeout(currentTimeout); // clear the current question timeout
        if (currentNumber <= 10) { // if this isn't the final question
            console.log(currentNumber + " we are still going")
            askQuestion(); // ask the next question

        } else { // if this is the final qustion, do something to end the game
            gameEnd(); // call the function to end the game
        }

    } else { //if it's WRONG; see line 195
        clearTimeout(currentTimeout); // clear the current question timeout
        if (currentNumber <= 10) { // if this isn't the final question
            askQuestion(); // ask the next question

        } else { // if this is the final qustion, do something to end the game
            gameEnd(); // call the function to end the game
        }
    }
    // more css stuff that I haven't created yet 
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

// simple function that gives us a formatted string of the categories (ripe for the API request)
async function formatCats(categories) {
    let data = [];
    for (cat of categories) {
        data.push(cat.value);
    }
    return data.join(",");
}



// point of focus for 11/30/25
async function gameEnd() {
    gameStillGoing = false;

    document.getElementById("question-box").classList.add("invisible-div"); // not sure why, but this causes a lot of issues
    document.getElementById("end-screen").classList.remove("invisible-div");
    const gameDetails = document.getElementById("game-detail-screen");

    let endCats = await formatCats(categories)

    let difMult // final score difficulty multiplier
    if (difficulty === "easy") {
        difMult = 1;
    } else if (difficulty === "medium") {
        difMult = 2;
    } else {difMult = 3;}

    // code the calculate the final score
    const finalScore = (
        endCats.split(",").length *
        questionsRight *
        difMult
    );
    
    gameDetails.textContent = `Questions right: ${questionsRight}/10
Categories: ${endCats.split(",").join(", ").replaceAll("_", " ")}.
Difficulty: ${difficulty}.
Final score: ${finalScore}!`

    /* code to disable everything and show end screen */
}




function createQuestion(questionNumber) {
    const question = triviaQuestions[questionNumber-1]; // so the handling of questions is easier
    console.log(triviaQuestions[questionNumber-1])
    const rightAnswer = question.correctAnswer; // store a variable so we know which answer is the right one

    answerList.length = 0; // MERGE THESE ARRAYS. this is a debug array

    let answers = new Array();
    answers.push(rightAnswer, question.incorrectAnswers[0], question.incorrectAnswers[1], question.incorrectAnswers[2]); // store the answers into the array

    answers.sort(); // sort the answers in alphabetical order to jumble them up.

    document.getElementById("question-title").textContent = question.question // set the question title

    for (let index = 0; index < answers.length; index++) {
        const answer = new Answer(
            answers[index], 
            index+1, 
            rightAnswer === answers[index] ? true : false
        ); // create a new question using the array's current index's value. Set the answer number to index+1 since index is 0-3 and answer number 1-4. Quick and cool use of the ternary operator to set the right param to true if answer[index] is the correct answer.
        answerList.push(answer);
        
        answer.setCard();
    }
}


async function askQuestion() {
    if (gameStillGoing) { // if the game is still going, // check if this is useless or not now that when clicked has been changed 11/30/25

        createQuestion(currentNumber); // ask a question
        gameInfo.textContent = `${currentNumber}/10` // change the question number visible 
        restartTimer();
        if (currentNumber < 10) { // if the question number is below 10 (max amount of questions)
            currentTimeout = setTimeout(() => {
                // maybe lose a life?
                currentNumber++;
                askQuestion(); //recursion!
                

            }, timeToAnswer*1000); // create a timeout to ask the next question
        } else {
            console.log("here!")
            currentTimeout = setTimeout(gameEnd, timeToAnswer*1000); // create a timeout to ask the next question
        }
    }
} 
// stuff for the timer
let currentAnimationID = 0;
let start;


function restartTimer() {
    timerBox.style.width = "410px";
    if (currentAnimationID) {
        start = undefined;
        window.cancelAnimationFrame(currentAnimationID);
    }

    currentAnimationID = window.requestAnimationFrame(timerCallback);
}

// code based off MDN reqAniFrame page
function timerCallback(timestamp) {
    if (start === undefined) { // if the start is undefined then set it to the start if this animation. This marks the first frame
        start = timestamp;
    }
    const elapsed = timestamp - start; // see how long it has been since the start
    const progress = Math.min(elapsed / 15000, 1); // 15k is the time we want it to last in milliseconds. Divide them to create a % basically
    // Math.min() is used here to make sure the element stops at exactly 200px
    const newWidth = 410-progress*410 // subtract the width * the progress from the actual width
    //+(timerBox.style.width.replace("px", ""));
   
    // code to change the color || Really like this!

    red = Math.min(progress*2*255, 255); // slowely raise the red value to 510, but if it is higher than 255, use 255 instead
    
    green = Math.min(510-(progress*2)*255, 255); // slowely lower the green value from 510 to 255, but it will use 255 until the green value is below 255


    timerBox.style.backgroundColor = `rgb(${red} ${green} 150)` // set the background color of the timerbox, withh some extra blue to make it loo nice

    timerBox.style.width = newWidth + "px"; // set the wdth to the new value with px
    if (progress < 1) { // if the progress is above 1 then don't call the next frame
        currentAnimationID = requestAnimationFrame(timerCallback);
    }
}