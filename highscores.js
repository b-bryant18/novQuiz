const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//Always JSON.parse when getting items from LS

highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="high-score>${score.name} - ${score.score}</li>`;
    })
        .join("");