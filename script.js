"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let plantSubmit = document.getElementById("plantButton");
plantSubmit.addEventListener("click", addPlant);

const corn = new Image();
corn.src = "images/corn1.png";
corn.onload = function () {
  ctx.drawImage(corn, 100, 350);
};

function addPlant() {
  let input = document.getElementById("plantType").value;
  console.log(input);
}
