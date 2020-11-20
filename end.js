const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

//Retrieve highScores from LS or retrieve empty array if no scores
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highScores);
//localStorage saves items as strings by default
//Use JSON.parse to turn string into object when getting items from LS

const MAX_HIGH_SCORES = 5;

//Save button disabled unless username is entered
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

//Runs when save button is clicked
saveHighScore = (e) => {
    console.log("I clicked the save button")
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    //Push new score to highScores array
    highScores.push(score);

    //Sort highScores: high to low
    highScores.sort((a, b) => b.score - a.score);

    //Keep top 5 scores only
    highScores.splice(5);

    //Save new highScores to LS
    localStorage.setItem('highScores', JSON.stringify(highScores));
    //Turn objects into strings 
    //Use JSON.stringify to turn objects into strings when setting items to LS

    console.log(highScores);
};