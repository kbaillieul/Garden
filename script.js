"use strict";
/* create variables for canvas */
let plantDetail = [
  ["tomato", "images/tomato1.png", 100, 275, 100, 100],
  ["tomato2", "images/tomato2.png", 100, 275, 150, 150],
  ["tomato3", "images/tomato3.png", 100, 275, 200, 200],
  ["corn", "images/corn1.png", 300, 275, 100, 100],
  ["corn2", "images/corn2.png", 300, 275, 150, 150],
  ["corn3", "images/corn3.png", 300, 275, 200, 200],
  ["sunflower", "images/sunflower1.png", 500, 275, 100, 100],
  ["sunflower2", "images/sunflower2.png", 500, 275, 150, 150],
  ["sunflower3", "images/sunflower3.png", 300, 275, 200, 200],
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
      ctx.drawImage(
        plantPicture,
        plantDetail[i][2],
        plantDetail[i][3],
        plantDetail[i][4],
        plantDetail[i][5]
      );

      /*Add plant watering option when plant added to canvas but not if plant already present in garden*/
      if (activePlants.includes(plantDetail[i]) === false) {
        const newOption = new Option(
          `Water ${plantDetail[i][0]}`,
          `${plantDetail[i][0]}2`
        );
        water.add(newOption, undefined);
      }
      /*Update array to show active plants in garden*/
      activePlants.push(plantDetail[i]);
    }
  }
}

console.log(activePlants);

/*Function to water plants*/
function addWater() {
  let waterInput = document.getElementById("water").value;
  for (let i = 0; i < plantDetail.length; i++) {
    if (waterInput === plantDetail[i][0]) {
      let plantPicture = new Image();
      plantPicture.src = plantDetail[i][1];
      ctx.drawImage(
        plantPicture,
        plantDetail[i][2],
        plantDetail[i][3],
        plantDetail[i][4],
        plantDetail[i][5]
      );
      activePlants.push(plantDetail[i]);
    }
  }
}
