export const initializeMap = (elementId: string) => {
  if (!window.WE) {
    console.error('WebGL Earth not loaded');
    return null;
  }

  try {
    const options = {
      atmosphere: true,
      center: [20.0, 0.0],
      zoom: 2.5,
      dragging: true,
      scrollWheelZoom: true
    };

    const map = window.WE.map(elementId, options);

    // Use HTTPS URL for the tile layer
    const tileLayer = window.WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });

    tileLayer.addTo(map);
    console.log('Map created successfully');
    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
    return null;
  }
};