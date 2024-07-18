// Function to update dice images based on random numbers
function updateDiceImages() {
    var randomNumbers = [];

    // Generate random numbers for each dice and update images
    for (var i = 1; i <= 4; i++) {
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        updateImg(randomNumber, `.img${i}`);
        randomNumbers.push(randomNumber);
    }

    // Determine the winner or if it's a draw
    determineWinner(randomNumbers);
}

// Function to update individual dice image based on random number
function updateImg(randomNumber, imgClass) {
    var imgElement = document.querySelector(imgClass);
    imgElement.setAttribute("src", `./images/dice${randomNumber}.png`);
}

// Function to determine winner or draw
function determineWinner(randomNumbers) {
    var resultElement = document.querySelector('h2');
    var sum = randomNumbers.reduce((acc, curr) => acc + curr, 0);

    // Determine if there is a winner or a draw
    var maxNumber = Math.max(...randomNumbers);
    var winners = randomNumbers.filter(number => number === maxNumber);
    
    if (winners.length === 1) {
        var winnerIndex = randomNumbers.indexOf(maxNumber) + 1;
        resultElement.textContent = `${getPlayerName(winnerIndex)} Wins!`;
    } else {
        resultElement.textContent = "It's a Draw!";
    }

    // Show the result element
    resultElement.style.display = 'block';
}

// Function to limit input length to 15 characters
function limitInputLength(event, element, maxLength) {
    if (element.textContent.length >= maxLength && event.key !== 'Backspace') {
        event.preventDefault();
    }
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior (creating a new line)
        element.blur(); // Remove focus from the editable element
    }
}

// Function to update player names and store in sessionStorage
function updateName(playerNumber) {
    let playerName = document.getElementById(`player${playerNumber}`).textContent.trim();
    sessionStorage.setItem(`player${playerNumber}`, playerName);
}

// Function to load player names from sessionStorage on window load
function loadNames() {
    for (let i = 1; i <= 4; i++) {
        const savedName = sessionStorage.getItem(`player${i}`);
        if (savedName) {
            document.getElementById(`player${i}`).textContent = savedName;
        }
        attachEventListeners(i);
    }
}

function attachEventListeners(playerNumber) {
    const playerElement = document.getElementById(`player${playerNumber}`);
    playerElement.addEventListener('input', () => updateName(playerNumber));
}

function getPlayerName(playerIndex){
    return document.getElementById(`player${playerIndex}`).textContent.trim();
}

// Initialize: Roll dice and determine winner/draw on page load
window.onload = function() {
    loadNames();
    updateDiceImages();
};

