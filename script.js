"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let plantSubmit = document.getElementById("plantButton");
plantSubmit.addEventListener("click", addPlant);

const tomato = new Image();
tomato.src = "images/tomato1.png";
const corn = new Image();
corn.src = "images/corn1.png";
const sunflower = new Image();
sunflower.src = "images/sunflower1.png";

function addPlant() {
  let input = document.getElementById("plantType").value;
  if (input === "tomato") {
    ctx.drawImage(tomato, 100, 275, 150, 150);
  } else if (input === "corn") {
    ctx.drawImage(corn, 300, 275, 150, 150);
  } else if (input === "sunflower") {
    ctx.drawImage(sunflower, 500, 275, 150, 150);
  }
}
