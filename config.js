function btnSave(){
    btnZoom = createButton('Aplicar alterações')
    btnZoom.position(20, 900);
    btnZoom.mousePressed(redraw);
    btnSeed = createButton('Gerar outro mapa');
    btnSeed.mousePressed(generateSeed);
  }
  
  function createSliders(){
    sliderZoom = createSlider(20, 100, 50);
    sliderNoise = createSlider(3, 20, 7);
    sliderNoise.position(0, 850);
  }
  
  function createTerrain(){
    waterTerrain = new TerrainType(0.2, 0.4, color(0, 239, 225), color(0, 175, 239));
    sandTerrain = new TerrainType(0.4, 0.5, color(240, 232, 184), color(240, 209, 158));
    grassTerrain = new TerrainType(0.5, 0.7, color(125, 240, 138), color(125, 182, 138));
    mountainTerrain = new TerrainType(0.7, 0.75, color(184, 137, 115), color(255, 255, 255));
  }
  
  function getTerrainColor(noiseValue, mapType){
    const normalized = normalize(noiseValue, mapType.maxHeight, mapType.minHeight);
    return lerpColor(mapType.minColor, mapType.maxColor, mapType.lerpAdjustment + normalized);
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
  
  function addNoise(valor){
    noiseDetail(valor, 0.5);
  }
  
  function generateSeed(){
    noiseSeed(millis());
    drawMap();
    console.log('teste');
}
