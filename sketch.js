
class TerrainType {
  constructor(minHeight, maxHeight, minColor, maxColor, lerpAdjustment = 0){
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.minColor = minColor;
    this.maxColor = maxColor;
    this.lerpAdjustment = lerpAdjustment;
  }
}
let slider;

let waterTerrain;
let sandTerrain;
let grassTerrain;
let mountainTerrain;

function setup() {
  createCanvas(1000, 800);
  background(200);
  btnZoom();
  createSliders();
  createTerrain();
  noLoop();
}


function draw() {
  drawMap();
}

function drawMap(){
  let zoomFactor = slider.value();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const noiseValue = noise(x/zoomFactor, y/zoomFactor);
      let terrainColor;
      
      if (noiseValue < waterTerrain.maxHeight){
        terrainColor = getTerrainColor(noiseValue, waterTerrain);
      } else if (noiseValue < 0.5){
        terrainColor = getTerrainColor(noiseValue, sandTerrain);
      } else if (noiseValue < 0.8){
        terrainColor = getTerrainColor(noiseValue, grassTerrain);
      } else {
        terrainColor = getTerrainColor(noiseValue, mountainTerrain);
      }
      
      set(x, y, terrainColor)
    }
  }
  updatePixels();
}

function btnZoom(){
  btnZoom = createButton('Aplicar zoom')
  btnZoom.mousePressed(redraw);
}

function createSliders(){
  slider = createSlider(50, 200, 100);
}

function createTerrain(){
  waterTerrain = new TerrainType(0.2, 0.4, color(0, 239, 225), color(0, 175, 239));
  sandTerrain = new TerrainType(0.4, 0.5, color(0, 239, 225), color(0, 175, 239), 0.3);
  grassTerrain = new TerrainType(0.5, 0.7, color(0, 239, 225), color(0, 175, 239));
  mountainTerrain = new TerrainType(0.7, 0.75, color(0, 239, 225), color(0, 175, 239), -0.5);
}

function getTerrainColor(noiseValue, mapType){
  const normalized = normalize(noiseValue, mapType.maxHeight, mapType.minHeight);
  return lerpColor(mapType.minColor, mapType.maxColor, normalized + mapType.lerpAdjustment);
}

function normalize(value, max, min) {
  if (value > max) {
    return 1;
  }
  if (value < min) {
    return 0;
  }
  return (value - min) / (max - min);
}