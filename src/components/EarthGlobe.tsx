import { useEffect, useRef } from 'react';
import { initializeMap } from '@/utils/mapInitialization';
import { animateToPosition } from '@/utils/mapAnimation';

declare global {
  interface Window {
    WE: any;
  }
}

interface EarthGlobeProps {
  targetLocation?: {
    latitude: number;
    longitude: number;
    locationText?: string;
  };
}

export function EarthGlobe({ targetLocation }: EarthGlobeProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Initialize map
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.webglearth.com/v2/api.js';
    script.async = true;

    // Add custom styles for the popup
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

    script.onload = () => {
      const map = initializeMap('earth-map');
      if (map) {
        mapRef.current = map;
        // Set initial position
        map.setView([20.0, 0.0], 2.5);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Handle target location changes
  useEffect(() => {
    if (!mapRef.current || !targetLocation) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.removeFrom(mapRef.current);
      markerRef.current = null;
    }

    // Cancel ongoing animation
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const currentPos = mapRef.current.getPosition();
    const startPos: [number, number] = [currentPos[0], currentPos[1]];
    const targetPos: [number, number] = [targetLocation.latitude, targetLocation.longitude];

    cleanupRef.current = animateToPosition(
      mapRef.current,
      startPos,
      targetPos,
      mapRef.current.getZoom(),
      3,
      1500,
      () => {
        // Add marker after animation
        if (mapRef.current && targetLocation) {
          markerRef.current = window.WE.marker([targetLocation.latitude, targetLocation.longitude])
            .addTo(mapRef.current)
            .bindPopup(targetLocation.locationText || "Location", { 
              maxWidth: 120,
              className: 'we-pp'
            });

          if (markerRef.current) {
            markerRef.current.openPopup();
          }
        }
      }
    );
  }, [targetLocation]);

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