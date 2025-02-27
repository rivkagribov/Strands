const words = ["SILLY", "HEART", "CUPID", "ROSES", "STINK", "SWEET", "DUCKS", "QUACK", "LATKE", "AMOUR", "LUCKY", "FLIRT", "FRUIT"];
const gridRows = 6, gridCols = 8;
let grid = [];
let selectedWord = "";
let foundWords = new Set();

// Generate a random letter grid
function generateGrid() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    grid = Array.from({ length: gridRows }, () =>
        Array.from({ length: gridCols }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
    );
}

// Display the grid in HTML
function displayGrid() {
    const gridContainer = document.getElementById("grid");
    gridContainer.innerHTML = "";
    grid.forEach((row, rIdx) => {
        row.forEach((letter, cIdx) => {
            let cell = document.createElement("div");
            cell.textContent = letter;
            cell.className = "cell";
            cell.dataset.row = rIdx;
            cell.dataset.col = cIdx;
            cell.addEventListener("click", () => selectLetter(rIdx, cIdx, cell));
            gridContainer.appendChild(cell);
        });
    });
}

// Handle letter selection
function selectLetter(row, col, cell) {
    if (cell.classList.contains("selected")) return;
    selectedWord += grid[row][col];
    cell.classList.add("selected");

    if (words.includes(selectedWord)) {
        foundWords.add(selectedWord);
        document.getElementById("wordsFound").textContent = "Words Found: " + Array.from(foundWords).join(", ");
        document.querySelectorAll(".selected").forEach(el => el.classList.add("found"));
        selectedWord = "";
    }
}

// Reset the game
function resetGame() {
    foundWords.clear();
    selectedWord = "";
    generateGrid();
    displayGrid();
    document.getElementById("wordsFound").textContent = "Words Found: ";
}

// Initialize game
document.getElementById("resetButton").addEventListener("click", resetGame);
generateGrid();
displayGrid();
