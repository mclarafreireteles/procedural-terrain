
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

let waterTerrain;
let sandTerrain;
let grassTerrain;
let mountainTerrain;

function setup() {
  createCanvas(windowWidth, 800);
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
      const noiseValue = noise(x/zoomFactor, y/zoomFactor);
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
}


