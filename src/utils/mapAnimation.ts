export const animateToPosition = (
  map: any,
  startPos: [number, number],
  targetPos: [number, number],
  startZoom: number,
  targetZoom: number,
  duration: number,
  onComplete: () => void
) => {
  const startTime = performance.now();
  let animationFrame: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Simple linear interpolation
    const currentLat = startPos[0] + (targetPos[0] - startPos[0]) * progress;
    const currentLng = startPos[1] + (targetPos[1] - startPos[1]) * progress;
    const currentZoom = startZoom + (targetZoom - startZoom) * progress;

    map.setView([currentLat, currentLng], currentZoom);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      onComplete();
    }
  };

  animationFrame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrame);
};