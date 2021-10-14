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
      /*Need to add conditional logic to stop adding same watering option multiple times*/
      const newOption = new Option(
        `Water ${plantDetail[i][0]}`,
        `${plantDetail}`
      );
      water.add(newOption, undefined);
      activePlants.push(plantDetail[i]);
    }
  }
}
console.log(activePlants);
/*Function to water plants*/
function addWater() {
  let waterInput = document.getElementById("water").value;
}

// const tomato = new Image();
// tomato.src = "images/tomato1.png";
// const corn = new Image();
// corn.src = "images/corn1.png";
// const sunflower = new Image();
// sunflower.src = "images/sunflower1.png";
/* Function to add plants to garden based on user selection and add watering options to second dropdown */
// function addPlant() {
//   let plantinput = document.getElementById("plantType").value;
//   if (plantinput === "tomato") {
//     ctx.drawImage(tomato, 100, 275, 150, 150);
//     activePlants.push("tomato1");
//     const newOption = new Option("Water Tomato", "watertomato");
//     water.add(newOption, undefined);
//   } else if (plantinput === "corn") {
//     ctx.drawImage(corn, 300, 275, 150, 150);
//     activePlants.push("corn1");
//     const newOption = new Option("Water Corn", "watercorn");
//     water.add(newOption, undefined);
//   } else if (plantinput === "sunflower") {
//     ctx.drawImage(sunflower, 500, 275, 150, 150);
//     activePlants.push("sunflower1");
//     const newOption = new Option("Water Sunflowers", "watersunflowers");
//     water.add(newOption, undefined);
//   }
// }

/*Function to increase plant size when water option selected*/
// function addWater() {
//   let waterInput = document.getElementById("water").value;
//   if (waterInput === "watertomato") {
//     tomato.src = "images/tomato2.png";
//     ctx.drawImage(tomato, 100, 275, 200, 200);
//     activePlants.push("tomato2");
//   }
//   if (waterInput === "watertomato" && activePlants.includes("tomato2")) {
//     tomato.src = "images/tomato3.png";
//     ctx.drawImage(tomato, 100, 275, 300, 300);
//     activePlants.push("tomato3");
//   }
//   if (waterInput === "watercorn") {
//     corn.src = "images/corn2.png";
//     ctx.drawImage(corn, 100, 275, 200, 200);
//     activePlants.push("corn2");
//   }
//   if (waterInput === "watercorn" && activePlants.includes("corn2")) {
//     corn.src = "images/corn3.png";
//     ctx.drawImage(corn, 100, 275, 300, 300);
//     activePlants.push("corn3");
//   }
// }
