import { useEffect, useRef } from 'react';
import { initializeMap } from '@/utils/mapInitialization';
import { animateToPosition } from '@/utils/mapAnimation';
import { createMarker } from '@/utils/mapMarker';

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

  // Initialize the map
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.webglearth.com/v2/api.js';
    script.async = true;

    // Add styles for popup
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
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Handle location updates
  useEffect(() => {
    if (!mapRef.current) {
      console.log('Map not initialized yet');
      return;
    }

    console.log('Handling location update:', targetLocation);

    // Clean up existing marker
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

    if (!targetLocation) {
      console.log('No target location, resetting view');
      cleanupRef.current = animateToPosition(
        mapRef.current,
        startPos,
        [20.0, 0.0],
        mapRef.current.getZoom(),
        2.5,
        1500,
        () => {
          console.log('Reset animation completed');
        }
      );
      return;
    }

    console.log('Animating to target location:', targetLocation);
    cleanupRef.current = animateToPosition(
      mapRef.current,
      startPos,
      [targetLocation.latitude, targetLocation.longitude],
      mapRef.current.getZoom(),
      3,
      1500,
      () => {
        console.log('Creating marker at target location');
        if (mapRef.current && targetLocation) {
          markerRef.current = createMarker(
            mapRef.current,
            targetLocation.latitude,
            targetLocation.longitude,
            targetLocation.locationText
          );
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