"use strict";
/* create variables for canvas, plant picture inputs, and form buttons */
let plantDetail = [
  ["tomato", "images/tomato1.png", 50, 150, 100, 100],
  ["tomato2", "images/tomato2.png", 50, 130, 125, 125],
  ["tomato3", "images/tomato3.png", 50, 100, 150, 150],
  ["corn", "images/corn1.png", 170, 150, 100, 100],
  ["corn2", "images/corn2.png", 160, 130, 125, 125],
  ["corn3", "images/corn3.png", 150, 100, 150, 150],
  ["sunflower", "images/sunflower1.png", 250, 150, 100, 100],
  ["sunflower2", "images/sunflower2.png", 250, 130, 125, 125],
  ["sunflower3", "images/sunflower3.png", 250, 100, 145, 145],
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/* Event listener for Add Plant and Add Water Submit buttons */
let submit = {
  plantSubmit: document.getElementById("plantButton"),
  waterSubmit: document.getElementById("waterButton"),
};
const water = document.querySelector("#water");
submit.plantSubmit.addEventListener("click", addPlant);
submit.waterSubmit.addEventListener("click", addWater);
/* Array to hold plants present in garden */
let activePlants = [];
let rainArray = [];
/*Function for animated clouds when all plant reach growth stage 3 */
let clouds = {
  cloudImg: new Image(),
  xcloud: canvas.width,
  rainImg: new Image(),
  yrain: 125,
  moving: true,
};

clouds.cloudImg.src = "images/clouds.png";
clouds.rainImg.src = "images/rain.png";

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
      // call animate function when activePlants array contains all plants at growth stage 3 to initiate rain animation

      for (let i = 0; i < 10; i++) {
        let x = Math.random() * canvas.width;
        rainArray.push(new Rain(x, 125, 1));
      }
      animate();
    }
  }
}

/* animate function for clouds to move across canvas and rain to begin */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, 375, 125);
  ctx.drawImage(clouds.cloudImg, clouds.xcloud, 0, 375, 125);
  if (clouds.xcloud > 0) {
    clouds.xcloud -= 1;
  } else if (clouds.xcloud === 0) {
    animateRain();
    clouds.xcloud -= 1;
  }
}

function Rain(x, y, dy) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.draw = function () {
    ctx.drawImage(clouds.rainImg, this.x, this.y, 25, 25);
  };
  this.update = function () {
    if (this.y < 150) {
      this.y += this.dy;
      this.draw();
    }
  };
}

function animateRain() {
  requestAnimationFrame(animateRain);
  ctx.clearRect(0, 80, 375, 120);
  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].update();
  }
}
