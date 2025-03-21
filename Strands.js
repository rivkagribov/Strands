document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-container");
    const hintElement = document.getElementById("hint");
    
    // Sample word grid (adjust as needed)
    const words = [
        ["C", "A", "T", "S"],
        ["D", "O", "G", "S"],
        ["F", "I", "S", "H"],
        ["B", "I", "R", "D"],
        ["P", "U", "M", "A"]      
    ];
    
    //const promt = "TODAY'S THEME";
    const hint = "ANIMALS";
    //want a box around it 
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
                    cell.classList.toggle("selected");
                });
                rowContainer.appendChild(cell);
              });
             gridContainer.appendChild(rowContainer);
        });
    }
    
    //const count = enternumber "of " enternumbertotal"theme words found." //bottom of the page prompt 
    //const hint = "ANIMALS"; // button for hint
    
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
