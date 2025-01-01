export const createMarker = (map: any, latitude: number, longitude: number, locationText?: string) => {
  if (!map || !window.WE) {
    console.error('Map or WebGL Earth not available for marker creation');
    return null;
  }

  try {
    const marker = window.WE.marker([latitude, longitude]);
    
    marker.addTo(map)
      .bindPopup(locationText || "Location", { 
        maxWidth: 120,
        className: 'we-pp'
      });
    
    // Delay popup opening to ensure marker is properly placed
    setTimeout(() => {
      if (marker) {
        marker.openPopup();
      }
    }, 1000);

    return marker;
  } catch (error) {
    console.error('Error creating marker:', error);
    return null;
  }
};