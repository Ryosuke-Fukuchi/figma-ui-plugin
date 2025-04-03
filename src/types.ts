type StrokeAlign = "INSIDE" | "OUTSIDE" | "CENTER";

interface RectangleNodeInput {
  type: "RECTANGLE";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: RGB;
  strokes?: SolidPaint[];
  strokeWeight?: number;
  strokeAlign?: StrokeAlign;
  effects?: Effect[];
  dashPattern?: number[];
}

interface TextNodeInput {
  type: "TEXT";
  characters: string;
  x?: number;
  y?: number;
  fontSize?: number;
}

interface LineNodeInput {
  type: "LINE";
  x?: number;
  y?: number;
  rotation?: number;
  width?: number;
  strokes?: SolidPaint[];
  strokeWeight?: number;
  effects?: Effect[];
  dashPattern?: number[];
}

interface EllipseNodeInput {
  type: "ELLIPSE";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fills?: SolidPaint[];
  strokes?: SolidPaint[];
  strokeWeight?: number;
  strokeAlign?: StrokeAlign;
  dashPattern?: number[];
}

type UINode =
  | TextNodeInput
  | RectangleNodeInput
  | LineNodeInput
  | EllipseNodeInput;

interface UIFrame {
  name: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  nodes: UINode[];
}

interface UIJson {
  frames: UIFrame[];
}
