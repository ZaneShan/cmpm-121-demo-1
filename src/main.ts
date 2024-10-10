import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// variables
let skeletonsPerSec: number = 0;
let count: number = 0;
let lastTime: number = 0;
let upgradeACount: number = 0;
let upgradeBCount: number = 0;
let upgradeCCount: number = 0;
let upgradeAprice: number = 10;
let upgradeBprice: number = 100;
let upgradeCprice: number = 1000;

// title
const gameName = "Necromancer Simulator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


// Clicker button
const button = document.createElement("button");
button.innerHTML = "💀";
button.style.width = "300px";
button.style.height = "300px";         
button.style.borderRadius = "50%";
button.style.fontSize = "100px";
button.style.backgroundColor = "#778399";
button.style.border = "none";
button.style.cursor = "pointer";
button.style.outline = "none";
button.style.transition = "transform 0.1s"; // tween effect
// center emoji
button.style.display = "flex";         
button.style.alignItems = "center";
button.style.justifyContent = "center";
button.style.margin = "auto";  
// Add hover effect
button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)"; // Slightly enlarge button on hover
});
button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)"; // Return to normal size
});
app.append(button);
// click event
button.addEventListener("click", () => {
    count++;
    updateCounter();
    // push effect
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
        button.style.transform = "scale(1)"; //reset scale
    }, 100); // 100ms duration for the press effect
});

// divider between button and counters
const divider = document.createElement("div");
divider.style.width = "100%";
divider.style.height = "4px";
divider.style.backgroundColor = "rgba(102, 102, 102, 0)"; //transparent
divider.style.margin = "20px 0";
app.appendChild(divider);

// container to hold div counters
const container = document.createElement("div");
container.className = "counter-container";
app.appendChild(container);  // append container to the app
// counter DIV
const counter = document.createElement("div");
counter.innerHTML = `${count.toFixed(2)} 💀`;
counter.className = "counter";
container.appendChild(counter);  // append to container
// skeleton Per Second Div
const skeletonsPerSecDiv = document.createElement("div");
skeletonsPerSecDiv.innerHTML = `${skeletonsPerSec.toFixed(1)} 💀 per second`;
skeletonsPerSecDiv.className = "counter";
container.appendChild(skeletonsPerSecDiv);  // append to container

// upgrade button
    // A
const upgradeA = document.createElement("button");
upgradeA.className = "upgrade styled";
upgradeA.type = "button";
upgradeA.innerHTML = `(${upgradeACount}) Grave Digger Shovels (${upgradeAprice.toFixed(2)} 💀)`
upgradeA.disabled = true; // start as disabled
app.append(upgradeA);
    // B
const upgradeB = document.createElement("button");
upgradeB.className = "upgrade styled";
upgradeB.type = "button";
upgradeB.innerHTML = `(${upgradeBCount}) Necromancy Tomes (${upgradeBprice.toFixed(2)} 💀)`
upgradeB.disabled = true;
app.append(upgradeB);
    // C
const upgradeC = document.createElement("button");
upgradeC.className = "upgrade styled";
upgradeC.type = "button";
upgradeC.innerHTML = `(${upgradeCCount}) Graveyard Scavengers (${upgradeCprice.toFixed(2)} 💀)`
upgradeC.disabled = true;
app.append(upgradeC);

// update prices helper
const updatePrices = () => {
    if (upgradeACount > 0) {
        upgradeAprice = 10 * (1.15 ** upgradeACount);
    }
    if (upgradeBCount > 0) {
        upgradeBprice = 100 * (1.15 ** upgradeBCount)
    }
    if (upgradeBCount > 0) {
        upgradeCprice = 1000 * (1.15 ** upgradeCCount)
    }
}

// upgrade event
upgradeA.addEventListener("click", () => {
    if (count >= upgradeAprice) {
        count -= upgradeAprice; 
        skeletonsPerSec += .1; 
        upgradeACount += 1;
        updatePrices();
        updateCounter(); 
    }
});
upgradeB.addEventListener("click", () => {
    if (count >= upgradeBprice) {
        count -= upgradeBprice;  
        skeletonsPerSec += 2;  
        upgradeBCount += 1;
        updatePrices();
        updateCounter(); 
    }
});
upgradeC.addEventListener("click", () => {
    if (count >= upgradeCprice) {
        count -= upgradeCprice;  
        skeletonsPerSec += 50; 
        upgradeCCount += 1;
        updatePrices();
        updateCounter();  
    }
});

// helper function to update counter display
const updateCounter = () => {
    counter.innerHTML = `${count.toFixed(2)} 💀`;
    skeletonsPerSecDiv.innerHTML = `${skeletonsPerSec.toFixed(1)} 💀 per second`;
    upgradeA.innerHTML = `(${upgradeACount}) Grave Digger Shovels (${upgradeAprice.toFixed(2)} 💀)`
    upgradeB.innerHTML = `(${upgradeBCount}) Necromancy Tomes (${upgradeBprice.toFixed(2)} 💀)`
    upgradeC.innerHTML = `(${upgradeCCount}) Graveyard Scavengers (${upgradeCprice.toFixed(2)} 💀)`

    // update upgrade availability
    upgradeA.disabled = count < upgradeAprice;
    upgradeB.disabled = count < upgradeBprice;
    upgradeC.disabled = count < upgradeCprice;
};

const animate = (currentTime: number) => {
    if (lastTime === undefined) lastTime = currentTime;

    const deltaTime = currentTime - lastTime;
    if (deltaTime >= 1000) {
        lastTime = currentTime;
      
        // update count
        count += skeletonsPerSec;
        updateCounter();
    }
  
    requestAnimationFrame(animate); 
};

// start animation
requestAnimationFrame(animate);
