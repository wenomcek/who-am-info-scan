export const createMarker = (map: any, latitude: number, longitude: number, locationText?: string) => {
  const marker = window.WE.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(locationText || "Location", { 
      maxWidth: 120,
      className: 'we-pp'
    });
  
  marker.openPopup();
  return marker;
};