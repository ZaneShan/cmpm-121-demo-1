import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//variables
let cakePerSec: number = 1;
let count: number = 0;
let lastTime: number = 0;

//title
const gameName = "MoonCake Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


//clicker
const button = document.createElement("button");
button.innerHTML = "🥮";
app.append(button);

//counterDIV
const counter = document.createElement("div");
counter.innerHTML = `${count.toFixed(2)} 🥮`;
counter.className = "counter";
app.append(counter);

//upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.className = "upgrade styled";
upgradeButton.type = "button";
upgradeButton.innerHTML = "Purchase (10 🥮)";
upgradeButton.disabled = true; // start as disabled
app.append(upgradeButton);

//upgrade event
upgradeButton.addEventListener("click", () => {
    if (count >= 10) {
        count -= 10;  // Deduct 10 cookies
        cakePerSec += 1;  // Increase the growth rate
        updateCounter();  // Update the counter display
    }
});

  //click event
button.addEventListener("click", () => {
    count++;  // Increment the counter
    updateCounter(); // Update the message
});

//helper function to update counter display
const updateCounter = () => {
    counter.innerHTML = `${count.toFixed(2)} 🥮`;

    //enable upgrade
    if (upgradeButton.disabled && count >= 10) {
        upgradeButton.disabled = false;
    }
    else {upgradeButton.disabled = true}
};


const animate = (currentTime: number) => {
    if (lastTime === 0) lastTime = currentTime;
  
    const deltaTime = currentTime - lastTime; 
    lastTime = currentTime;
  
    count += (cakePerSec * deltaTime) / 1000;
  
    updateCounter();
  
    requestAnimationFrame(animate); 
};

requestAnimationFrame(animate);
