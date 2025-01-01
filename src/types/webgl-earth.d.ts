interface WEMarker {
  addTo: (map: any) => WEMarker;
  bindPopup: (content: string, options?: { maxWidth?: number; className?: string }) => WEMarker;
  openPopup: () => void;
  removeFrom: (map: any) => void;
}

interface WETileLayer {
  addTo: (map: any) => void;
}

interface WE {
  map: (elementId: string, options: {
    atmosphere?: boolean;
    center?: [number, number];
    zoom?: number;
    dragging?: boolean;
    scrollWheelZoom?: boolean;
  }) => any;
  marker: (coordinates: [number, number]) => WEMarker;
  tileLayer: (url: string, options: { attribution: string }) => WETileLayer;
}

declare global {
  interface Window {
    WE: WE;
  }
}

export {};