export const initializeMap = (elementId: string) => {
  if (!window.WE) return null;

  const options = {
    center: [20, 0],
    zoom: 2.2,
    dragging: true,
    scrollWheelZoom: true,
    atmosphere: true,
    sky: true
  };

  const map = window.WE.map(elementId, options);

  const tileLayer = window.WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    tileSize: 256,
    bounds: [[-85, -180], [85, 180]],
    minZoom: 0,
    maxZoom: 16,
    attribution: '© OpenStreetMap contributors'
  });

  tileLayer.addTo(map);
  return map;
};