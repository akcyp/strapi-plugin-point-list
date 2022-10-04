import React from 'react';

class Point {
  constructor(public x: number, public y: number) {}
  toString() {
    return `${this.x},${this.y}`;
  }
  static fromString(str: string) {
    const [x, y] = str.split(',');
    return new Point(parseInt(x), parseInt(y));
  }
}

const pathToString = (arr: Point[]): string => arr.map(point => point.toString()).join(' ');
const pathFromString = (str: string): Point[] => str.split(' ').filter(Boolean).map(str => Point.fromString(str));

type MediaModalComponent = React.FC<{
  allowedTypes: string[];
  onClose(): void;
  onSelectAssets(files: { url: string }[]): void;
}>;

const PointListInput: React.FunctionComponent<{}> = (props) => {
  console.log(props);
  return <>Test</>;
};

export default PointListInput;
