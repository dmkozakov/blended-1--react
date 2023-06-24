export const normalizeImages = images => {
  return images.map(({ alt, src: { medium }, id, avg_color }) => ({
    alt,
    medium,
    id,
    avg_color,
  }));
};
