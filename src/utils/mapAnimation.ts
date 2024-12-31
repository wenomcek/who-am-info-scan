export const easeInOutCubic = (t: number) => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const animateToPosition = (
  map: any,
  startPos: [number, number],
  targetPos: [number, number],
  startZoom: number,
  targetZoom: number,
  duration: number,
  onComplete: () => void
) => {
  const start = performance.now();
  let animationFrame: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    const currentLat = startPos[0] + (targetPos[0] - startPos[0]) * eased;
    const currentLng = startPos[1] + (targetPos[1] - startPos[1]) * eased;
    const currentZoom = startZoom + (targetZoom - startZoom) * eased;

    map.setPosition([currentLat, currentLng]);
    map.setZoom(currentZoom);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      onComplete();
    }
  };

  animationFrame = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationFrame);
};