export const stageSize = { width: 1200, height: 600 };

export function categoryPoint(index: number) {
  return {
    x: 92,
    y: 138 + index * 112,
  };
}

export function yearPoint(index: number) {
  return {
    x: 354 + index * 211,
    y: 515,
  };
}