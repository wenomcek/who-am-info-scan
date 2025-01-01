import { useEffect, useRef } from 'react';
import { animateToPosition } from '@/utils/mapAnimation';
import { createMarker } from '@/utils/mapMarker';

interface LocationUpdateProps {
  map: any;
  targetLocation?: {
    latitude: number;
    longitude: number;
    locationText?: string;
  };
}

export const useLocationUpdate = ({ map, targetLocation }: LocationUpdateProps) => {
  const markerRef = useRef<any>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!map) {
      console.log('Map not initialized yet');
      return;
    }

    console.log('Handling location update:', targetLocation);

    // Clean up existing marker
    if (markerRef.current) {
      markerRef.current.removeFrom(map);
      markerRef.current = null;
    }

    // Cancel ongoing animation
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const currentPos = map.getPosition();
    const startPos: [number, number] = [currentPos[0], currentPos[1]];

    if (!targetLocation) {
      console.log('No target location, resetting view');
      cleanupRef.current = animateToPosition(
        map,
        startPos,
        [20.0, 0.0],
        map.getZoom(),
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
      map,
      startPos,
      [targetLocation.latitude, targetLocation.longitude],
      map.getZoom(),
      3,
      1500,
      () => {
        console.log('Creating marker at target location');
        if (map && targetLocation) {
          markerRef.current = createMarker(
            map,
            targetLocation.latitude,
            targetLocation.longitude,
            targetLocation.locationText
          );
        }
      }
    );

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (markerRef.current) {
        markerRef.current.removeFrom(map);
      }
    };
  }, [map, targetLocation]);
};