import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// variables
let cakePerSec: number = 0;
let count: number = 0;
let lastTime: number = 0;
let upgradeACount: number = 0;
let upgradeBCount: number = 0;
let upgradeCCount: number = 0;
let upgradeAprice: number = 10;
let upgradeBprice: number = 100;
let upgradeCprice: number = 1000;

// title
const gameName = "MoonCake Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


// clicker
const button = document.createElement("button");
button.innerHTML = "🥮";
app.append(button);

// container to hold div counters
const container = document.createElement("div");
container.className = "counter-container";
app.appendChild(container);  // append container to the app
// counter DIV
const counter = document.createElement("div");
counter.innerHTML = `${count.toFixed(0)} 🥮`;
counter.className = "counter";
container.appendChild(counter);  // append to container
// cake per second DIV
const cakePerSecDiv = document.createElement("div");
cakePerSecDiv.innerHTML = `${cakePerSec.toFixed(2)} 🥮 per second`;
cakePerSecDiv.className = "counter";
container.appendChild(cakePerSecDiv);  // append to container

// upgrade button
const upgradeA = document.createElement("button");
upgradeA.className = "upgrade styled";
upgradeA.type = "button";
upgradeA.innerHTML = "Purchase (10 🥮)";
upgradeA.disabled = true; // start as disabled
app.append(upgradeA);

const upgradeB = document.createElement("button");
upgradeB.className = "upgrade styled";
upgradeB.type = "button";
upgradeB.innerHTML = "Purchase (100 🥮)";
upgradeB.disabled = true; // start as disabled
app.append(upgradeB);

const upgradeC = document.createElement("button");
upgradeC.className = "upgrade styled";
upgradeC.type = "button";
upgradeC.innerHTML = "Purchase (1000 🥮)";
upgradeC.disabled = true; // start as disabled
app.append(upgradeC);

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
        cakePerSec += .1; 
        upgradeACount += 1;
        updatePrices();
        updateCounter(); 
    }
});
upgradeB.addEventListener("click", () => {
    if (count >= upgradeBprice) {
        count -= upgradeBprice;  
        cakePerSec += 2;  
        upgradeBCount += 1;
        updatePrices();
        updateCounter(); 
    }
});
upgradeC.addEventListener("click", () => {
    if (count >= upgradeCprice) {
        count -= upgradeCprice;  
        cakePerSec += 50; 
        upgradeCCount += 1;
        updatePrices();
        updateCounter();  
    }
});

  // click event
button.addEventListener("click", () => {
    count++;
    updateCounter();
});

// helper function to update counter display
const updateCounter = () => {
    counter.innerHTML = `${count.toFixed(2)} 🥮`;
    cakePerSecDiv.innerHTML = `${cakePerSec.toFixed(1)} 🥮`;
    upgradeA.innerHTML = `(${upgradeACount}) Purchase (${upgradeAprice.toFixed(2)} 🥮)`
    upgradeB.innerHTML = `(${upgradeBCount}) Purchase (${upgradeBprice.toFixed(2)} 🥮)`
    upgradeC.innerHTML = `(${upgradeCCount}) Purchase (${upgradeCprice.toFixed(2)} 🥮)`

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
        count += cakePerSec;
        updateCounter();
    }
  
    requestAnimationFrame(animate); 
};

// start animation
requestAnimationFrame(animate);
