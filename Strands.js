document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-container");
    const hintElement = document.getElementById("hint");
    const attemptCounter = document.getElementById("attempt-counter");
    const foundWordsCounter = document.getElementById("found-words-counter");
    
    const words = [
        ["C", "A", "T", "S"],
        ["D", "O", "G", "S"],
        ["F", "I", "S", "H"],
        ["B", "I", "R", "D"],
        ["P", "U", "M", "A"]      
    ];

    const correctWords = ["CATS", "DOGS", "FISH", "BIRD", "PUMA"];
    
    const hint = "ANIMALS"; //want a box around it 
    const maxAttempts = 5;
    let currentAttempts = maxAttempts;
    let foundWords = 0;
    let selectedCells = [];
    
    function createGrid() {
        if (!gridContainer) {
            console.error("Grid container not found!");
            return;
        }
        gridContainer.innerHTML = "";
        words.forEach(row => {
            const rowContainer = document.createElement("div"); 
            rowContainer.classList.add("grid-row");
            row.forEach(letter => {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.textContent = letter;

                cell.addEventListener("click", () => {
                 if (!cell.classList.contains("selected")) {
                 cell.classList.add("selected");
                 selectedCells.push(cell); // Add to selected group
                 } else {
                    cell.classList.remove("selected");
                    selectedCells = selectedCells.filter(c => c !== cell); 
                }
                updateSelection(); 
            }); 
                rowContainer.appendChild(cell);
            });
           gridContainer.appendChild(rowContainer);
        });
    }
    function updateSelection() {
    selectedCells.forEach((cell, index) => {
        cell.style.backgroundColor = "lightblue"; 
        });
    }
    
     function checkWord() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join("");
        if (correctWords.includes(selectedWord)) {
            alert(`Congrats: ${selectedWord} is one of the words!`);
            foundWords++;
            foundWordsCounter.textContent = `Words Found: ${foundWords}`;
        } else {
            alert("Not a valid word!");
        }
        // Clear selected cells
        selectedCells = [];
        createGrid(); // Optional reset to clear selections
    }
    
    function updateAttempts() {
        currentAttempts--;
        attemptCounter.textContent = `${currentAttempts} of 5 theme words found.`;

        if (currentAttempts === 0) {
            alert("You've used all your attempts! Game over!");
            gridContainer.style.pointerEvents = "none";
        }
    }

      function handleEnterKey() {
        if (currentAttempts > 0) {
            if (selectedCells.length > 0) {
                checkWord(); // Check if the word is correct
                updateAttempts(); // Reduce attempts
            } else {
                alert("You must select letters before submitting!");
            }
        }
    }
    function displayHint() {
        if (!hintElement) {
            console.error("Hint element not found!");
            return;
        }
        hintElement.textContent = hint;
    }
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleEnterKey();
        }
    });
    
    createGrid();
    displayHint();
    attemptCounter.textContent = `${currentAttempts} of 5 theme words found.`;
    foundWordsCounter.textContent = `Words Found: ${foundWords}`;
});
