"use strict";
/* create variables for canvas, plant picture inputs, and form buttons */
let plantDetail = [
  ["tomato", "images/tomato1.png", 50, 170, 80, 80],
  ["tomato2", "images/tomato2.png", 50, 160, 90, 90],
  ["tomato3", "images/tomato3.png", 50, 150, 100, 100],
  ["corn", "images/corn1.png", 170, 170, 80, 80],
  ["corn2", "images/corn2.png", 165, 160, 90, 90],
  ["corn3", "images/corn3.png", 160, 150, 100, 100],
  ["sunflower", "images/sunflower1.png", 250, 170, 80, 80],
  ["sunflower2", "images/sunflower2.png", 250, 160, 90, 90],
  ["sunflower3", "images/sunflower3.png", 250, 150, 100, 100],
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/* Event listener for Add Plant and Add Water Submit buttons */
let submit = {
  plantSubmit: document.getElementById("plantButton"),
  waterSubmit: document.getElementById("waterButton"),
  restartSubmit: document.getElementById("playAgainButton"),
};
const water = document.querySelector("#water");
submit.plantSubmit.addEventListener("click", addPlant);
submit.waterSubmit.addEventListener("click", addWater);
submit.restartSubmit.addEventListener("click", restart);
/* Array to hold plants present in garden */
let activePlants = [];
let rainArray = [];
/*Function for animated clouds when all plant reach growth stage 3 */
let clouds = {
  cloudImg: new Image(),
  xcloud: canvas.width,
  rainImg: new Image(),
  counter: 0,
  bannerImg: new Image(),
  xbanner: canvas.width,
};
/*set image sources for images used in animations*/
clouds.cloudImg.src = "images/clouds.png";
clouds.rainImg.src = "images/rain.png";
clouds.bannerImg.src = "images/banner.png";

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

/*Function to water plants*/
function addWater() {
  let waterInput = document.getElementById("water").value;
  for (let i = 0; i < plantDetail.length; i++) {
    /* Checks plant in waterInput and if plant has not already been watered (going from plant 1 to plant2) */
    if (
      waterInput === plantDetail[i][0] &&
      activePlants.includes(waterInput) === false
    ) {
      /*clear canvas of previous plant image*/
      ctx.clearRect(
        plantDetail[i][2],
        plantDetail[i][3],
        plantDetail[i][4],
        plantDetail[i][5]
      );
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
      ctx.clearRect(
        plantDetail[i][2],
        plantDetail[i][3],
        plantDetail[i][4],
        plantDetail[i][5]
      );
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
  ctx.clearRect(0, 0, 375, 100);
  ctx.drawImage(clouds.cloudImg, clouds.xcloud, 0, 375, 100);
  /*Cloud image starts at right of canvas and moves towards left side*/
  if (clouds.xcloud > 0) {
    clouds.xcloud -= 1;
  } else if (clouds.xcloud === 0) {
    /*stop cloud animation at x=0 of canvas, then start counter for rain animation intervals*/
    animateRain();
    clouds.xcloud -= 1;
    clouds.counter += 1;
  } else if (clouds.counter === 1 || clouds.counter < 50) {
    clouds.counter += 1;
  } else if (clouds.counter === 50) {
    /*Create 10 Rain objects at randomized x locations across canvas and add to rainArray. Call animateRain function to animate rain objects stored in rainArray. */
    rainArray = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * canvas.width;
      rainArray.push(new Rain(x, 80, 1));
    }
    animateRain();
    clouds.counter += 1;
  } else if (clouds.counter > 50 && clouds.counter < 100) {
    clouds.counter += 1;
  } else if (clouds.counter === 100) {
    rainArray = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * canvas.width;
      rainArray.push(new Rain(x, 60, 1));
    }
    animateRain();
    clouds.counter += 1;
  } else if (clouds.counter > 100 && clouds.counter < 500) {
    /* After 3 sets of rain animations, move cloud image left to move out of canvas then display play again banner*/
    clouds.counter += 1;
    clouds.xcloud -= 1;
  } else if (clouds.counter === 500) {
    ctx.drawImage(clouds.bannerImg, 100, 0, 200, 150);
  }
}

/* Constructor function to create rain objects at different x values along canvas*/
function Rain(x, y, dy) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.draw = function () {
    ctx.drawImage(clouds.rainImg, this.x, this.y, 25, 25);
  };
  this.update = function () {
    if (this.y < 130) {
      this.y += this.dy;
      this.draw();
    }
  };
}

/*Function to initiate rain animation using Rain objects */
function animateRain() {
  requestAnimationFrame(animateRain);
  ctx.clearRect(0, 100, 375, 50);
  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].update();
  }
}

/*Function to reload page on Play Again button click event */
function restart() {
  window.location.reload(false);
  activePlants = [];
  rainArray = [];
  clouds.counter = 0;
  clouds.xcloud = canvas.width;
}
