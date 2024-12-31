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
  const cleanupAnimationRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.webglearth.com/v2/api.js';
    script.async = true;
    script.onload = () => {
      const map = initializeMap('earth-map');
      if (map) mapRef.current = map;
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (cleanupAnimationRef.current) {
        cleanupAnimationRef.current();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !targetLocation) return;

    // Remove previous marker if it exists
    if (markerRef.current) {
      markerRef.current.removeFrom(mapRef.current);
      markerRef.current = null;
    }

    // Cancel any ongoing animation
    if (cleanupAnimationRef.current) {
      cleanupAnimationRef.current();
      cleanupAnimationRef.current = null;
    }

    const currentPos = mapRef.current.getPosition();
    const startPos: [number, number] = [currentPos[0], currentPos[1]];
    const targetPos: [number, number] = [targetLocation.latitude, targetLocation.longitude];
    const startZoom = mapRef.current.getZoom();
    const targetZoom = 4;

    cleanupAnimationRef.current = animateToPosition(
      mapRef.current,
      startPos,
      targetPos,
      startZoom,
      targetZoom,
      2000,
      () => {
        // Add marker after animation completes
        const locationText = targetLocation.locationText || "Location not specified";
        markerRef.current = window.WE.marker([targetLocation.latitude, targetLocation.longitude])
          .addTo(mapRef.current)
          .bindPopup(
            `<div style="text-align: center; color: black; font-weight: bold;">${locationText}</div>`,
            { maxWidth: 150, closeButton: false }
          );

        if (markerRef.current) {
          markerRef.current.openPopup();
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