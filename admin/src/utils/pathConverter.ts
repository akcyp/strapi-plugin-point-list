export const pathConverter = {
  fromString(path: string) {
    if (!path.match(/^(?:(?:\d+,\d+)\s)*(?:\d+,\d+)$/)) {
      return [];
    }
    return path.split(/\s+/).map(str => {
      const [x, y] = str.split(',');
      return { x: parseInt(x), y: parseInt(y) };
    });
  },
  toString(path: { x: number, y: number }[]) {
    return path.map(({ x, y }) => `${x},${y}`).join(' ');
  }
};
