export const stageSize = { width: 1200, height: 640 };

export function categoryPoint(index: number) {
  return {
    x: 150 + index * 300,
    y: 150,
  };
}

export function yearPoint(index: number) {
  return {
    x: 150 + index * 300,
    y: 520,
  };
}