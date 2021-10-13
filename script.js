"use strict";
/* create variables for canvas */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/* Event listener for Add Plant Submit button */
let plantSubmit = document.getElementById("plantButton");
const water = document.querySelector("#water");
plantSubmit.addEventListener("click", addPlant);
/* Array to hold plants present in garden */
let activePlants = [];
/* constants to hold image sources for plants */
const tomato = new Image();
tomato.src = "images/tomato1.png";
const corn = new Image();
corn.src = "images/corn1.png";
const sunflower = new Image();
sunflower.src = "images/sunflower1.png";
/* Function to add plants to garden based on user selection */
function addPlant() {
  let input = document.getElementById("plantType").value;
  if (input === "tomato") {
    ctx.drawImage(tomato, 100, 275, 150, 150);
    activePlants.push("tomato1");
    console.log(activePlants);
    const newOption = new Option("Water Tomato", "watertomato");
    water.add(newOption, undefined);
  } else if (input === "corn") {
    ctx.drawImage(corn, 300, 275, 150, 150);
    activePlants.push("corn1");
    console.log(activePlants);
    const newOption = new Option("Water Corn", "watercorn");
    water.add(newOption, undefined);
  } else if (input === "sunflower") {
    ctx.drawImage(sunflower, 500, 275, 150, 150);
    activePlants.push("sunflower1");
    console.log(activePlants);
    const newOption = new Option("Water Sunflowers", "watersunflowers");
    water.add(newOption, undefined);
  }
}
