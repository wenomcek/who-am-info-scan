import { useMapInitialization } from '@/hooks/useMapInitialization';
import { useLocationUpdate } from '@/hooks/useLocationUpdate';

interface EarthGlobeProps {
  targetLocation?: {
    latitude: number;
    longitude: number;
    locationText?: string;
  };
}

export function EarthGlobe({ targetLocation }: EarthGlobeProps) {
  const mapRef = useMapInitialization();
  useLocationUpdate({ map: mapRef.current, targetLocation });

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