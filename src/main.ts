import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// variables
let skeletonsPerSec: number = 0;
let count: number = 0;
let clickCount: number = 1;
let lastTime: number = 0;

interface Item {
    name: string,
    description: string,
    flavortext: string,
    cost: number,
    rate: number,
    clickRate: number
};
  
const availableItems: Item[] = [
    { name: "Study Necromancy", 
        description: "Channel your ability to More efficiently reanimate the dead. Clicks gives more skeletons.",
        flavortext: "Skin-bound tomes with dog-eared pages and conceptual metal band logos scribbled by previous owners sit next to a pile of chinese take-out.",
        cost: 10, rate: 0, clickRate: 0.1 },
    { name: "Gravepickers", 
        description: "Summon little helpers to scavenge bones from graveyards long-forgotten.",
        flavortext: `"Tinybones, please don't tell me you've lost your calcaneus again."`, 
        cost: 50, rate: 1, clickRate: 0 },
    { name: "Skeleton Necromancers", 
        description: "Extra hands for creating your unholy army.",
        flavortext: "NECROMANCERS UNION ASSERTS 'ABSOLUTE, AIRTIGHT' ANTI-NECRO-AUTOMATION STANCE",
        cost: 100, rate: 100, clickRate: 0 },
    { name: "Ritual Portal", 
        description: "Herald other-dimensional undead to this world.",
        flavortext: "This ritual actually doesnt require this many bones; the other half is used for a delicious broth that keeps the creatures from the portal from eating us.",
        cost: 1000, rate: 50, clickRate: 0 },
    { name: "Plague of Rebirth", 
        description: "Sweep the atmosphere with a miasma that ends all life and brings it back.",
        flavortext: "Generally unethical not for its capacity for death but for its effect on global warming.",
        cost: 3000, rate: 100, clickRate: 0 },
];
// item variables
const upgradeCounts: number[] = [0, 0, 0, 0, 0]; // upgrade counts for A, B, C
let upgradePrices: number[] = availableItems.map(item => item.cost); // initial upgrade prices

// title
const gameName = "Necromancer's Apprentice";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// clicker button
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
// add hover effect
button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)"; // slightly enlarge button on hover
});
button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)"; // return to normal size
});
app.append(button);

// click event
button.addEventListener("click", () => {
    count += clickCount;
    updateCounter();
    // push effect
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
        button.style.transform = "scale(1)"; // reset scale
    }, 100); // 100ms duration for the press effect
});

// divider to seperate button and div counters
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
// const upgradeA = document.createElement("button");
// upgradeA.className = "upgrade styled";
// upgradeA.type = "button";
// upgradeA.innerHTML = `(${upgradeACount}) Grave Digger Shovels (${upgradeAprice.toFixed(2)} 💀)`
// upgradeA.disabled = true; // start as disabled
// app.append(upgradeA);
//     // B
// const upgradeB = document.createElement("button");
// upgradeB.className = "upgrade styled";
// upgradeB.type = "button";
// upgradeB.innerHTML = `(${upgradeBCount}) Necromancy Tomes (${upgradeBprice.toFixed(2)} 💀)`
// upgradeB.disabled = true;
// app.append(upgradeB);
//     // C
// const upgradeC = document.createElement("button");
// upgradeC.className = "upgrade styled";
// upgradeC.type = "button";
// upgradeC.innerHTML = `(${upgradeCCount}) Graveyard Scavengers (${upgradeCprice.toFixed(2)} 💀)`
// upgradeC.disabled = true;
// app.append(upgradeC);
availableItems.forEach((item, index) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.className = "upgrade styled";
    upgradeButton.type = "button";
    upgradeButton.innerHTML = `(${upgradeCounts[index]}) ${item.name} (${upgradePrices[index].toFixed(2)} 💀)`;
    upgradeButton.disabled = true; // Start as disabled
    app.append(upgradeButton);

    // Tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `each ${item.name} prduces ${item.rate}💀 per second and ${item.clickRate}💀 per click <br> ${item.description} <br> <span style="font-size: 10px; font-style: italic;">${item.flavortext}</span>`;
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#444";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.visibility = "hidden"; // initially hidden
    tooltip.style.zIndex = "1000"; // ensure it's above other elements
    document.body.appendChild(tooltip);
    // tooltip positioning
    upgradeButton.addEventListener("mousemove", (e) => {
        tooltip.style.left = `${e.pageX + 10}px`; // offset to avoid mouse pointer
        tooltip.style.top = `${e.pageY + 10}px`; // offset below mouse pointer
    });
    // show on mouseover
    upgradeButton.addEventListener("mouseover", () => {
        tooltip.style.visibility = "visible";
    });
    // hide on mouseout
    upgradeButton.addEventListener("mouseout", () => {
        tooltip.style.visibility = "hidden";
    });

    // Upgrade event
    upgradeButton.addEventListener("click", () => {
        if (count >= upgradePrices[index]) {
            count -= upgradePrices[index]; 
            skeletonsPerSec += item.rate; 
            clickCount += item.clickRate;
            upgradeCounts[index] += 1;
            updatePrices(); // Update prices for all items
            updateCounter(); 
        }
    });

    // Update prices for the button when the count is updated
    upgradeButton.addEventListener("click", () => {
        updateCounter();
    });
});

// update prices helper
// const updatePrices = () => {
//     if (upgradeACount > 0) {
//         upgradeAprice = 10 * (1.15 ** upgradeACount);
//     }
//     if (upgradeBCount > 0) {
//         upgradeBprice = 100 * (1.15 ** upgradeBCount)
//     }
//     if (upgradeBCount > 0) {
//         upgradeCprice = 1000 * (1.15 ** upgradeCCount)
//     }
// }
const updatePrices = () => {
    upgradePrices = availableItems.map((item, index) => item.cost * (1.15 ** upgradeCounts[index]));
};

// upgrade event
// upgradeA.addEventListener("click", () => {
//     if (count >= upgradeAprice) {
//         count -= upgradeAprice; 
//         skeletonsPerSec += .1; 
//         upgradeACount += 1;
//         updatePrices();
//         updateCounter(); 
//     }
// });
// upgradeB.addEventListener("click", () => {
//     if (count >= upgradeBprice) {
//         count -= upgradeBprice;  
//         skeletonsPerSec += 2;  
//         upgradeBCount += 1;
//         updatePrices();
//         updateCounter(); 
//     }
// });
// upgradeC.addEventListener("click", () => {
//     if (count >= upgradeCprice) {
//         count -= upgradeCprice;  
//         skeletonsPerSec += 50; 
//         upgradeCCount += 1;
//         updatePrices();
//         updateCounter();  
//     }
// });

// helper function to update counter display
// const updateCounter = () => {
//     counter.innerHTML = `${count.toFixed(2)} 💀`;
//     skeletonsPerSecDiv.innerHTML = `${skeletonsPerSec.toFixed(1)} 💀 per second`;
//     upgradeA.innerHTML = `(${upgradeACount}) Grave Digger Shovels (${upgradeAprice.toFixed(2)} 💀)`
//     upgradeB.innerHTML = `(${upgradeBCount}) Necromancy Tomes (${upgradeBprice.toFixed(2)} 💀)`
//     upgradeC.innerHTML = `(${upgradeCCount}) Graveyard Scavengers (${upgradeCprice.toFixed(2)} 💀)`

//     // update upgrade availability
//     upgradeA.disabled = count < upgradeAprice;
//     upgradeB.disabled = count < upgradeBprice;
//     upgradeC.disabled = count < upgradeCprice;
// };
const updateCounter = () => {
    // update counter and skelPerSec
    counter.innerHTML = `${count.toFixed(2)} 💀`;
    skeletonsPerSecDiv.innerHTML = `${skeletonsPerSec.toFixed(1)} 💀 per second`;
    
    availableItems.forEach((item, index) => {
        const upgradeButton = app.getElementsByClassName("upgrade styled")[index] as HTMLButtonElement; // reinitialize upgrade buttons
        upgradeButton.innerHTML = `(${upgradeCounts[index]}) ${item.name} (${upgradePrices[index].toFixed(2)} 💀)`; // update text
        upgradeButton.disabled = count < upgradePrices[index]; // update button state based on count
    });
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
