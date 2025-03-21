document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-container");
    const hintElement = document.getElementById("hint");
    
    const words = [
        ["C", "A", "T", "S"],
        ["D", "O", "G", "S"],
        ["F", "I", "S", "H"],
        ["B", "I", "R", "D"],
        ["P", "U", "M", "A"]      
    ];
    
    const hint = "ANIMALS"; //want a box around it 
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
                    selectedCells = selectedCells.filter(c => c !== cell); // Remove from group
             }

                updateSelection(); // Update display
            }); 
                rowContainer.appendChild(cell);
            });
               gridContainer.appendChild(rowContainer);
        });
    }
    function updateSelection() {
    selectedCells.forEach((cell, index) => {
        cell.style.backgroundColor = "lightblue"; 
        cell.style.borderColor = "darkblue"; //remove?
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
