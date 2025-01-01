export const createMarker = (map: any, latitude: number, longitude: number, locationText?: string) => {
  if (!map || !window.WE) return null;

  const marker = window.WE.marker([latitude, longitude]);
  
  marker.addTo(map)
    .bindPopup(locationText || "Location", { 
      maxWidth: 120,
      className: 'we-pp'
    });
  
  setTimeout(() => {
    marker.openPopup();
  }, 100);

  return marker;
};