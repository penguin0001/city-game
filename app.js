
let colour;
setUpAll();


// general start site function
function setUpAll() {
    // generate initial grid
    makeGuide(576);
    makeGrid(576);
    
    // pen colour
    colour = 'black';

    // buttons
    setUpNewCanvasButton();
    setUpClearButton();
    setUpAddColourButton();
    setUpColourButtons();
}

// set up buttons //

// new canvas button
function setUpNewCanvasButton() {
    const newCanvas = document.querySelector("#new");
    newCanvas.addEventListener('click', () => {
        clearGrid();
        clearGuide();
        const input = prompt("Enter grid size (max 576, must be a square number):");
        const canvas = document.querySelector(".canvas");
        if (isPerfectSquare(input) && input <= 576) {
            makeGuide(input);
            makeGrid(input);
        } else {
            alert("Invalid input!");
        }
    });
}

// clear button
function setUpClearButton() {
    const clear = document.querySelector("#clear");
    clear.addEventListener('click', () => {
        const divs = document.querySelectorAll(".gridElement");
        divs.forEach(div => {
            div.style.backgroundColor = "white";
            div.style.opacity = 0;
        });
    });
}


// new colour button
function setUpAddColourButton() {
    const addColour = document.querySelector("#addColour");
    addColour.addEventListener('click', () => {
        input = prompt("Enter new colour in CSS-friendly format: ");
        const newColour = document.createElement('button');
        
        newColour.classList.add('colour');
        newColour.setAttribute('id', input);
        
        const colourButtons = document.querySelector("#colourButtons");
        colourButtons.appendChild(newColour);
        setUpColourButtons();
    });
}

// colour buttons
function setUpColourButtons() {
    const colours = document.querySelectorAll(".colour");
    colours.forEach(colourButton => {
        colourButton.style.backgroundColor = colourButton.id;
        colourButton.addEventListener('click', () => {
            colour = colourButton.id;
        });
    });
}

// grid stuff //


// make grid
function makeGrid(size) {
    const canvas = document.querySelector(".canvas");
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.classList.add("gridElement");
        
        // draw
        div.addEventListener('click', () => {
            if (colour == 'erase') {
                div.style.opacity = 0;
            } else {
                div.style.backgroundColor = colour;
                div.style.opacity = 1;
            }
        });
        
        canvas.appendChild(div);
    }

    // makes it squares in a grid instead of lines!
    canvas.style.gridTemplateColumns = getAutos(size);
}

//make guide
function makeGuide(size) {
    const guide = document.querySelector(".guide");
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.classList.add("guideElement");
        guide.appendChild(div);
    }

    // makes it squares in a grid instead of lines!
    guide.style.gridTemplateColumns = getAutos(size);
}


// like helpers ig
function clearGrid() {
    const divs = document.querySelectorAll(".gridElement");
    const canvas = document.querySelector(".canvas");
    divs.forEach(div => canvas.removeChild(div));
}

function clearGuide() {
    const divs = document.querySelectorAll(".guideElement");
    const guide = document.querySelector(".guide");
    divs.forEach(div => guide.removeChild(div));
}

function getAutos(gridSize) {
    const number = Math.sqrt(gridSize);
    let autos = "auto";
    for (let i = 1; i < number; i++) {
        autos += " auto"
    }
    return autos;
}

function isPerfectSquare(x) {
    if (x >= 0) {   
        const sr = Math.sqrt(x);
        return ((sr * sr) == x);
    }
    return false;
}
