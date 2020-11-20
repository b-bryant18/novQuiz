const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highScores);
//localStorage saves items as strings by default
//JSON.parse turns strings into objects

//Save button disabled unless username is entered
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    console.log("I clicked the save button")
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    console.log(score);

    highScores.push(score);
    console.log(highScores);
};