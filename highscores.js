const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//Always JSON.parse when getting items from LS

//Displays usernames and score values 
highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
        .join("");

//A new li is created for each object in the highScores array

//.map creates a new array by calling a specified function on
// each element in the parent array
