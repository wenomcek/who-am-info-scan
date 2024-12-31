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

  useEffect(() => {
    // Load WebGL Earth API script
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
      mapRef.current.setView([targetLocation.latitude, targetLocation.longitude]);
    }
  }, [targetLocation]);

  const initMap = () => {
    if (!window.WE) return;

    const map = window.WE.map('earth-map', {
      center: [0, 0],
      zoom: 3,
      dragging: true,
      scrollWheelZoom: true
    });

    // Add base layer
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
      className="absolute inset-0 -z-10 bg-black"
    />
  );
}