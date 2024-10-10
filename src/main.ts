import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// variables
let cakePerSec: number = 0;
let count: number = 0;
let lastTime: number = 0;
let upgradeACount: number = 0;
let upgradeBCount: number = 0;
let upgradeCCount: number = 0;

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

// upgrade event
upgradeA.addEventListener("click", () => {
    if (count >= 10) {
        count -= 10; 
        cakePerSec += .1; 
        upgradeACount += 1;
        updateCounter(); 
    }
});
upgradeB.addEventListener("click", () => {
    if (count >= 100) {
        count -= 100;  
        cakePerSec += 2;  
        upgradeBCount += 1;
        updateCounter(); 
    }
});
upgradeC.addEventListener("click", () => {
    if (count >= 1000) {
        count -= 1000;  
        cakePerSec += 50; 
        upgradeCCount += 1;
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
    counter.innerHTML = `${count.toFixed(0)} 🥮`;
    cakePerSecDiv.innerHTML = `${cakePerSec.toFixed(1)} 🥮`;
    upgradeA.innerHTML = `(${upgradeACount}) Purchase (10 🥮)`
    upgradeB.innerHTML = `(${upgradeBCount}) Purchase (100 🥮)`
    upgradeC.innerHTML = `(${upgradeCCount}) Purchase (1000 🥮)`

    // update upgrade availability
    upgradeA.disabled = count < 10;
    upgradeB.disabled = count < 100;
    upgradeC.disabled = count < 1000;
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
