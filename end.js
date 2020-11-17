const username = document.getElementById("username");
username.addEventListener("keyup", () => {
    console.log(username.value)
});

saveHighScore = (e) => {
    console.log("I clicked the save button")
    e.preventDefault();
};