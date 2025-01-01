import { useEffect, useRef } from 'react';
import { initializeMap } from '@/utils/mapInitialization';

export const useMapInitialization = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.webglearth.com/v2/api.js';
    script.async = true;

    const style = document.createElement('style');
    style.textContent = `
      .we-pp {
        color: black !important;
      }
      .we-pp-wrapper {
        color: black !important;
      }
    `;
    document.head.appendChild(style);

    const initMap = () => {
      console.log('Initializing map...');
      const map = initializeMap('earth-map');
      if (map) {
        console.log('Map initialized successfully');
        mapRef.current = map;
      }
    };

    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return mapRef;
};