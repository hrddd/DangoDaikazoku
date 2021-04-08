type DangoProps = {
  width: number,
  height: number,
  fill: string,
  stroke: string,
  strokeWidth: number
}

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 514;
const DEFAULT_VIEWBOX_WIDTH = 360;
const DEFAULT_VIEWBOX_HEIGHT = 257;
const DEFAULT_STROKE_WIDTH = 8;

// strokeWidthを変更した時のアウトライン見切れ対策
const getViewBox = (strokeWidth: number) => {
  const strokeOffset = (strokeWidth - DEFAULT_STROKE_WIDTH) / 2;
  return `${-1 * strokeOffset} ${-1 * strokeOffset} ${DEFAULT_VIEWBOX_WIDTH + strokeOffset * 2} ${DEFAULT_VIEWBOX_HEIGHT + strokeOffset * 2}`
}

const Dango = ({ width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, fill = '#EEC8B3', stroke = '#5D3F35', strokeWidth = DEFAULT_STROKE_WIDTH }: DangoProps) => (
  <svg width={width} height={height} viewBox={getViewBox(strokeWidth)}>
    <path
      d="M356 152.5C356 101.359 325 4 190.259 4C59.0784 4 4 88.5 4 158C4 218 17.5 253 190.259 253C328.849 253 356 246 356 152.5Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
    <path
      d="M228 81.5V134.5M266 81.5V134.5"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export default Dango;