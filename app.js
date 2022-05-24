// initialise building types so we can access info about them
const house = {
    cost: 10,
    category: 'residential',
    capacity: 5
};

// set up buildings map to track quantities of types of buildings
let allBuildings = new Map();
allBuildings.set('house', 0);

// this is where we store what building or tool the user has selected
let building;

// main set up function
setUpAll();


// general start site function
function setUpAll() {
    // generate initial grid
    // The first 20 square numbers are 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 
    // 169, 196, 225, 256, 289, 324, 361, and 400.
    makeGuide(64);
    makeGrid(64);
    
    // current building (or tool)
    building = 'house';

    // set up buttons
    setUpBuildingButtons();

}

// set up buttons //

// BUILDING buttons
function setUpBuildingButtons() {
    const buildingButtons = document.querySelectorAll(".building");
    buildingButtons.forEach(buildingButton => {
        buildingButton.style.backgroundColor = 'white';
        buildingButton.style.backgroundImage = `url('images/${buildingButton.id}.png')`;
        buildingButton.addEventListener('click', () => {
            building = buildingButton.id;
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
            if (building == 'erase') {
                div.style.opacity = 0;
                div.style.backgroundImage = 'none';

                // remove an instance of the building
                // div.id is the building we want
                if (allBuildings.get(div.id) <= 0) {
                    console.log("error - can't remove more instances of this building");
                } else {
                    allBuildings.set(div.id, allBuildings.get(div.id) - 1)
                }
                
                // print list of buildings to console
                console.log(allBuildings);

            } else {
                // change this to using an image
                div.style.backgroundImage = `url('images/${building}.png')`;
                div.style.backgroundSize= '100% 100%';
                div.style.opacity = 1;
                div.id = building;

                // add to map of buildings
                allBuildings.set(div.id, allBuildings.get(div.id) + 1)

                // print map of buildings to console
                console.log(allBuildings);

                // update page?
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

// grid drawing helpers

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


