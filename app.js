
let colour;
setUpAll();


// general start site function
function setUpAll() {
    // generate initial grid
    // The first 20 square numbers are 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 
    // 169, 196, 225, 256, 289, 324, 361, and 400.
    makeGuide(64);
    makeGrid(64);
    
    // building? adapted from pen colour
    building = 'house.png';

}

// set up buttons //

// new canvas button
// just keeping this here for reference
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


// grid stuff //


// make grid
function makeGrid(size) {
    const canvas = document.querySelector(".canvas");
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.classList.add("gridElement");
        
        // draw
        div.addEventListener('click', () => {
            if (building == 'erase') {
                div.style.opacity = 0;
            } else {
                // change this to using an image
                div.style.backgroundImage = "url('images/house.png')";
                div.style.backgroundSize= '100% 100%';
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
