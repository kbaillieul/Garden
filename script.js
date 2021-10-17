"use strict";
/* create variables for canvas, plant picture inputs, and form buttons */
let plantDetail = [
  ["tomato", "images/tomato1.png", 100, 300, 100, 100],
  ["tomato2", "images/tomato2.png", 100, 260, 150, 150],
  ["tomato3", "images/tomato3.png", 100, 210, 200, 200],
  ["corn", "images/corn1.png", 300, 300, 100, 100],
  ["corn2", "images/corn2.png", 280, 260, 150, 150],
  ["corn3", "images/corn3.png", 270, 210, 200, 200],
  ["sunflower", "images/sunflower1.png", 500, 300, 100, 100],
  ["sunflower2", "images/sunflower2.png", 490, 260, 150, 150],
  ["sunflower3", "images/sunflower3.png", 480, 220, 175, 175],
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/* Event listener for Add Plant and Add Water Submit buttons */
let plantSubmit = document.getElementById("plantButton");
const water = document.querySelector("#water");
let waterSubmit = document.getElementById("waterButton");
plantSubmit.addEventListener("click", addPlant);
waterSubmit.addEventListener("click", addWater);
/* Array to hold plants present in garden */
let activePlants = [];

/*Function to add plant images to canvas */
function addPlant() {
  let plantInput = document.getElementById("plantType").value;
  for (let i = 0; i < plantDetail.length; i++) {
    if (plantInput === plantDetail[i][0]) {
      let plantPicture = new Image();
      plantPicture.src = plantDetail[i][1];
      plantPicture.onload = function () {
        ctx.drawImage(
          plantPicture,
          plantDetail[i][2],
          plantDetail[i][3],
          plantDetail[i][4],
          plantDetail[i][5]
        );
      };
      /*Add plant watering option when plant added to canvas but not if plant already present in garden*/
      if (activePlants.includes(plantDetail[i][0]) === false) {
        const newOption = new Option(
          `Water ${plantDetail[i][0]}`,
          `${plantDetail[i][0]}2`
        );
        water.add(newOption, undefined);
      }
      /*Update array to show active plants in garden*/
      activePlants.push(plantDetail[i][0]);
    }
  }
}

console.log(activePlants);

/*Function to water plants*/
function addWater() {
  let waterInput = document.getElementById("water").value;
  for (let i = 0; i < plantDetail.length; i++) {
    /* Checks plant in waterInput and if plant has not already been watered (going from plant 1 to plant2) */
    if (
      waterInput === plantDetail[i][0] &&
      activePlants.includes(waterInput) === false
    ) {
      let plantPicture = new Image();
      plantPicture.src = plantDetail[i][1];
      plantPicture.onload = function () {
        ctx.drawImage(
          plantPicture,
          plantDetail[i][2],
          plantDetail[i][3],
          plantDetail[i][4],
          plantDetail[i][5]
        );
      };
      activePlants.push(plantDetail[i][0]);
    } else if (
      /* checks plant in water input and if plant has been watered before (going from plant 2 to plant 3) */
      waterInput === plantDetail[i][0] &&
      activePlants.includes(plantDetail[i][0]) === true
    ) {
      let plantPicture = new Image();
      plantPicture.src = plantDetail[i + 1][1];
      plantPicture.onload = function () {
        ctx.drawImage(
          plantPicture,
          plantDetail[i + 1][2],
          plantDetail[i + 1][3],
          plantDetail[i + 1][4],
          plantDetail[i + 1][5]
        );
      };
      activePlants.push(plantDetail[i + 1][0]);
    }
    if (
      activePlants.includes("tomato3") &&
      activePlants.includes("corn3") &&
      activePlants.includes("sunflower3")
    ) {
      animate();
    }
  }
}

let clouds = new Image();
let xcloud = 75;
clouds.src = "images/clouds.png";

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, 665, 250);
  ctx.drawImage(clouds, xcloud, 50, 400, 200);
  if (xcloud < 160) {
    xcloud += 0.1;
  }
}
