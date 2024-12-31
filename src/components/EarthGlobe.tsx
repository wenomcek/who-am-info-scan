import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    WE: any;
  }
}

interface EarthGlobeProps {
  targetLocation?: {
    latitude: number;
    longitude: number;
  };
}

export function EarthGlobe({ targetLocation }: EarthGlobeProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.webglearth.com/v2/api.js';
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && targetLocation) {
      // Remove previous marker if it exists
      if (markerRef.current) {
        markerRef.current.removeFrom(mapRef.current);
      }

      // Add new marker
      markerRef.current = window.WE.marker([targetLocation.latitude, targetLocation.longitude])
        .addTo(mapRef.current)
        .bindPopup("You are here!", { maxWidth: 120 });

      // Animate to target location with closer zoom
      mapRef.current.setView([targetLocation.latitude, targetLocation.longitude], 5);
    }
  }, [targetLocation]);

  const initMap = () => {
    if (!window.WE) return;

    const map = window.WE.map('earth-map', {
      center: [20, 0], // Initial center point
      zoom: 2.2, // More zoomed out initially
      dragging: true,
      scrollWheelZoom: true,
      atmosphere: true,
      sky: true
    });

    window.WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
      tileSize: 256,
      bounds: [[-85, -180], [85, 180]],
      minZoom: 0,
      maxZoom: 16,
      attribution: 'WebGLEarth',
      tms: true
    }).addTo(map);

    mapRef.current = map;
  };

  return (
    <div 
      id="earth-map" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    />
  );
}