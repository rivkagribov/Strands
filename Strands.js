document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-container");
    const hintElement = document.getElementById("hint");
    
    // Sample word grid (adjust as needed)
    const words = [
        ["C", "A", "T", "S"],
        ["D", "O", "G", "S"],
        ["F", "I", "S", "H"],
        ["B", "I", "R", "D"]
    ];
    
    const hint = "Find the animals";
    
    function createGrid() {
        if (!gridContainer) {
            console.error("Grid container not found!");
            return;
        }
        gridContainer.innerHTML = "";
        words.forEach(row => {
            row.forEach(letter => {
                const cell = document.createElement("div");
                cell.classList.add("grid-cell");
                cell.textContent = letter;
                gridContainer.appendChild(cell);
            });
        });
    }
    
    function displayHint() {
        if (!hintElement) {
            console.error("Hint element not found!");
            return;
        }
        hintElement.textContent = hint;
    }
    
    createGrid();
    displayHint();
});
