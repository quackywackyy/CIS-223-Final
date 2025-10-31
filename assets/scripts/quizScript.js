/* Victor Richardson CIS-223 Final Project
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

*/




const questionOne = document.getElementById("qu-one");

function questionClicked() {
    alert("button one pressed");
}

questionOne.addEventListener("click", questionClicked);