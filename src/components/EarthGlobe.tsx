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
    locationText?: string;
  };
}

export function EarthGlobe({ targetLocation }: EarthGlobeProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const currentAnimationRef = useRef<any>(null);

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

      // Cancel any ongoing animation
      if (currentAnimationRef.current) {
        cancelAnimationFrame(currentAnimationRef.current);
      }

      // Get current position
      const currentPos = mapRef.current.getPosition();
      const startLat = currentPos[0];
      const startLng = currentPos[1];
      const startZoom = mapRef.current.getZoom();

      // Target position
      const targetLat = targetLocation.latitude;
      const targetLng = targetLocation.longitude;
      const targetZoom = 4;

      // Animation duration in milliseconds
      const duration = 2000;
      const start = performance.now();

      // Easing function for smooth animation
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Animation function
      const animate = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        // Interpolate position and zoom
        const currentLat = startLat + (targetLat - startLat) * eased;
        const currentLng = startLng + (targetLng - startLng) * eased;
        const currentZoom = startZoom + (targetZoom - startZoom) * eased;

        // Update map position and zoom
        mapRef.current.setPosition([currentLat, currentLng]);
        mapRef.current.setZoom(currentZoom);

        // Continue animation if not complete
        if (progress < 1) {
          currentAnimationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete, add marker
          const locationText = targetLocation.locationText || "Location not specified";
          markerRef.current = window.WE.marker([targetLat, targetLng])
            .addTo(mapRef.current)
            .bindPopup(`<div style="text-align: center; color: black; font-weight: bold;">${locationText}</div>`, {
              maxWidth: 150,
              closeButton: false
            });

          // Show the popup immediately and keep it open
          if (markerRef.current) {
            markerRef.current.openPopup();
          }
        }
      };

      // Start animation
      currentAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [targetLocation]);

  const initMap = () => {
    if (!window.WE) return;

    const map = window.WE.map('earth-map', {
      center: [20, 0],
      zoom: 2.2,
      dragging: true,
      scrollWheelZoom: true,
      atmosphere: true,
      sky: true
    });

    // Use OpenStreetMap tiles instead of the default WebGLEarth tiles
    window.WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 256,
      bounds: [[-85, -180], [85, 180]],
      minZoom: 0,
      maxZoom: 16,
      attribution: '© OpenStreetMap contributors',
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
