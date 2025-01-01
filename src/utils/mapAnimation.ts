export const animateToPosition = (
  map: any,
  startPos: [number, number],
  targetPos: [number, number],
  startZoom: number,
  targetZoom: number,
  duration: number,
  onComplete: () => void
) => {
  if (!map) return () => {};
  
  const startTime = performance.now();
  let animationFrame: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Cubic easing out for smoother animation
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const currentLat = startPos[0] + (targetPos[0] - startPos[0]) * easeProgress;
    const currentLng = startPos[1] + (targetPos[1] - startPos[1]) * easeProgress;
    const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;

    map.setView([currentLat, currentLng], currentZoom);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      map.setView(targetPos, targetZoom);
      onComplete();
    }
  };

  animationFrame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrame);
};