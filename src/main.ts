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

//helper function to update counter display
const updateCounter = () => {
    counter.innerHTML = `${count.toFixed(2)} 🥮`;
};

  //click event
button.addEventListener("click", () => {
    count++;  // Increment the counter
    updateCounter(); // Update the message
});


const animate = (currentTime: number) => {
    if (lastTime === 0) lastTime = currentTime;
  
    const deltaTime = currentTime - lastTime; 
    lastTime = currentTime;
  
    count += (cakePerSec * deltaTime) / 1000;
  
    updateCounter();
  
    requestAnimationFrame(animate); 
};

requestAnimationFrame(animate);
