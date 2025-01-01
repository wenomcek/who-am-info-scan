export const createMarker = (map: any, latitude: number, longitude: number, locationText?: string) => {
  if (!map || !window.WE) return null;

  const marker = window.WE.marker([latitude, longitude]);
  
  marker.addTo(map)
    .bindPopup(locationText || "Location", { 
      maxWidth: 120,
      className: 'we-pp'
    });
  
  // Delay popup opening to ensure marker is properly placed
  setTimeout(() => {
    marker.openPopup();
  }, 500);

  return marker;
};