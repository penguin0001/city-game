// **** GLOBAL VARIABLES **** //
// maybe have building type objects to store info abt them?

// track stats
// this one gets changed throughout the game a lot
let stats = new Map();
stats.set('money', 100);
stats.set('houses', 0);
stats.set('population', 0);
stats.set('capacity', 0);


// building stats
// there must be a better way of organising these

// types of buildings
let types = new Map();
types.set('house', 'residential');

// ALL:costs of buildings
let costs = new Map();
costs.set('house', 10);

// ALL: maximum amount of the building you can place
let maximums = new Map();
maximums.set('house', 20);

// RESIDENTIAL: how many people can the building hold
let capacities = new Map();
capacities.set('house', 5);



// this is where we store what building or tool the user has selected
let building;


// ************************** //


// **** RUN GAME **** //
setUpAll();
// ****************** //


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

// set up buttons 
function setUpBuildingButtons() {

    const buildingButtons = document.querySelectorAll('.building');
    buildingButtons.forEach(buildingButton => {
        buildingButton.style.backgroundColor = 'white';
        
        buildingButton.style.backgroundImage = `url('images/${buildingButton.id}.png')`;
        
        // could do this w CSS but then it breaks the other one so idk
        addTranslucentOnHover(buildingButton);

        // makes it so the selected tool/building highlights!
        // i think this creates a kind of awful loop situation
        addHighlighting(buildingButton.id);

        buildingButton.addEventListener('click', () => {
            building = buildingButton.id;  
        });
    });
}



// make grid
function makeGrid(size) {
    const canvas = document.querySelector('.canvas');
    for (let i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.classList.add('gridElement');
        // no background image by default
        div.style.backgroundImage = 'none';

        addTranslucentOnHover(div);
        
        // place building
        div.addEventListener('click', () => {
            // if sell tool is selected
            
            if (building == 'sell') {
                // can only sell if there is something there
                if (div.style.backgroundImage != 'none') {
                    div.style.opacity = 0;
                    div.style.backgroundImage = 'none';
    
                    // remove an instance of the building
                    // div.id is the building we want
                    if (stats.get(div.id + 's') <= 0) {
                        console.log('error - can\'t remove more instances of this building');
                    } else {
                        stats.set(div.id + 's', stats.get(div.id + 's')- 1)
                    }
                    
                    // update money
                    stats.set('money', stats.get('money') + costs.get(div.id));
                    
                    // if its a residential, update capacity
                    if (types.get(div.id) == 'residential') {
                        stats.set('capacity', stats.get('capacity') - capacities.get(div.id));
                    }
    
                    //update info box
                    updateStats();
                }

            } else {
                // only if there's nothing there
                if (div.style.backgroundImage == 'none') {
                    // image
                    div.style.backgroundImage = `url('images/${building}.png')`;
                    div.style.backgroundSize= '100% 100%';
                    div.style.opacity = 1;
                    div.id = building;

                    // add to map of buildings
                    stats.set(div.id + 's', stats.get(div.id + 's') + 1)

                    // update money
                    stats.set('money', stats.get('money') - costs.get(div.id));

                    // if its a residential, update capacity
                    if (types.get(div.id) == 'residential') {
                        stats.set('capacity', stats.get('capacity') + capacities.get(div.id));
                    }

                    // update info box
                    updateStats();
                } 
            }
        });
        
        canvas.appendChild(div);
    }

    // makes it squares in a grid instead of lines!
    canvas.style.gridTemplateColumns = getAutos(size);
}

// make guide
function makeGuide(size) {
    const guide = document.querySelector('.guide');
    for (let i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.classList.add('guideElement');
        guide.appendChild(div);
    }

    // makes it squares in a grid instead of lines!
    guide.style.gridTemplateColumns = getAutos(size);
}



// highlight selected building/tool
function updateSelection() {
    selection = document.querySelector(building);

}

// update stats box
function updateStats() {
    stats.forEach(function (key, value) {
        updateStat(value, key);
    });
}

// updates a stat in the stat box
function updateStat(statName, newValue) {
    const stat = document.querySelector('#' + statName);
    stat.innerHTML = newValue;
}


// button making helpers

// adds translucent on hover to an element
function addTranslucentOnHover(element) {
    // when hovering
    element.addEventListener('mouseover', () => {
        element.style.opacity = '50%';
    });

    // when not hovering
    element.addEventListener('mouseleave', () => {
        element.style.opacity = '100%';
    });
}

// gives buttons an outline when they're selected
function addHighlighting(buttonID) {
    const button = document.querySelector('#' + buttonID);
    const buildingButtons = document.querySelectorAll('.building');
    button.addEventListener('click', () => {
        button.style.outlineStyle = 'ridge';
        button.style.outlineColor = 'lightgray';
        button.style.outlineWidth = '5px';

        buildingButtons.forEach(buildingButton => {
            if(buildingButton.id != buttonID) {
                buildingButton.style.outline = '0px';
            }
        });
        
    });
}


// grid drawing helpers

function getAutos(gridSize) {
    const number = Math.sqrt(gridSize);
    let autos = 'auto';
    for (let i = 1; i < number; i++) {
        autos += ' auto'
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


