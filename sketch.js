
class TerrainType {
  constructor(minHeight, maxHeight, minColor, maxColor, lerpAdjustment = 0){
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.minColor = minColor;
    this.maxColor = maxColor;
    this.lerpAdjustment = lerpAdjustment;
  }
}

let sliderZoom;
let sliderNoise;

let zoomFactor;
let xVal, yVal;

let mapChanged = true;
let xOffset = 10000;
let yOffset = 10000;
const cameraSpeed = 10;

let waterTerrain;
let sandTerrain;
let grassTerrain;
let mountainTerrain;


function keyPressed(){
  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += 1 / zoomFactor * cameraSpeed;
    mapChanged = true;
    console.log(xVal, yVal)
  }
  if (keyIsDown(LEFT_ARROW)) {
    xOffset -= 1 / zoomFactor * cameraSpeed;
    mapChanged = true;
    console.log(xVal, yVal)
  }
  if (keyIsDown(UP_ARROW)) {
    yOffset -= 1 / zoomFactor * cameraSpeed;
    mapChanged = true;
    console.log(xVal, yVal)
  }
  if (keyIsDown(DOWN_ARROW)) {
    yOffset += 1 / zoomFactor * cameraSpeed;
    mapChanged = true;
    console.log(xVal, yVal)
  }
}


function setup() {
  createCanvas(1000, 800);
  background(200);
  btnSave();
  createSliders();
  createTerrain();
  noLoop();
}



function draw() {
  drawMap();
  addNoise(sliderNoise.value());
}

function drawMap(){
  let zoomFactor = sliderZoom.value();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const xVal = (x - width / 2) / zoomFactor + xOffset;
      const yVal = (y - height / 2) / zoomFactor + yOffset;
      const noiseValue = noise(xVal, yVal);
      let terrainColor;
      
      if (noiseValue < waterTerrain.maxHeight){
        terrainColor = getTerrainColor(noiseValue, waterTerrain);
      } else if (noiseValue < sandTerrain.maxHeight){
        terrainColor = getTerrainColor(noiseValue, sandTerrain);
      } else if (noiseValue < grassTerrain.maxHeight){
        terrainColor = getTerrainColor(noiseValue, grassTerrain);
      } else {
        terrainColor = getTerrainColor(noiseValue, mountainTerrain);
      }  
      set(x, y, terrainColor)
    }
  }
  updatePixels();
  mapChanged = false;
}


