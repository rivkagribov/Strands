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
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "grid-lines");
    gridContainer.appendChild(svg);
    
    function createGrid() {
        if (!gridContainer) {
            console.error("Grid container not found!");
            return;
        }
        gridContainer.innerHTML = "";
        gridContainer.appendChild(svg);
        
        words.forEach((row, rowIndex) => {
            const rowContainer = document.createElement("div"); 
            rowContainer.classList.add("grid-row");
            row.forEach((letter, colIndex) => {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.textContent = letter;
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;

                cell.addEventListener("click", () => {
                 if (!cell.classList.contains("selected")) {
                 cell.classList.add("selected");
                 selectedCells.push(cell);
                 drawLine();
                 } else {
                    cell.classList.remove("selected");
                    selectedCells = selectedCells.filter(c => c !== cell); 
                    drawLine();
                }
            }); 
                rowContainer.appendChild(cell);
            });
           gridContainer.appendChild(rowContainer);
        });
    }
    function drawLine() {
    svg.innerHTML = "";

        if (selectedCells.length > 1) {
            for (let i = 0; i < selectedCells.length - 1; i++) {
                const start = selectedCells[i].getBoundingClientRect();
                const end = selectedCells[i + 1].getBoundingClientRect();
                const gridRect = gridContainer.getBoundingClientRect();

                // Create a line connecting the centers of two cells
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", start.x + start.width / 2 - gridRect.x);
                line.setAttribute("y1", start.y + start.height / 2 - gridRect.y);
                line.setAttribute("x2", end.x + end.width / 2 - gridRect.x);
                line.setAttribute("y2", end.y + end.height / 2 - gridRect.y);
                line.setAttribute("stroke", "#a5d8ff");
                line.setAttribute("stroke-width", "4");

                svg.appendChild(line);
            }
        }
    }
     function checkWord() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join("");
        if (correctWords.includes(selectedWord)) {
            alert(`Congrats: ${selectedWord} is one of the words!`);
            // Lock correct word cells
            selectedCells.forEach(cell => {
                cell.classList.remove("selected");
                cell.classList.add("found");
                cell.style.backgroundColor = "white"; // Change to white background
                cell.style.pointerEvents = "none"; // Disable further interaction
            });
            foundWords++;
            foundWordsCounter.textContent = `Words Found: ${foundWords}`;
        } else {
            alert("Not a valid word!");
        }
        selectedCells = [];
        drawLine(); 
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
