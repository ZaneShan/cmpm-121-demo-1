import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "MoonCake Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🥮";
app.append(button);

const counter = document.createElement("div");
let count: number = 0;
counter.innerHTML = `${count} Mooncakes`;
counter.className = "counter";
app.append(counter);

button.addEventListener("click", () => {
    count++;  // Increment the counter
    counter.innerHTML = `${count} Mooncakes`; // Update the message
  });