type DangoProps = {
  width: number,
  height: number,
  fill: string,
}

const Dango = ({ width = 360, height = 257, fill = '#EEC8B3' }: DangoProps) => (
  <svg width={width} height={height} viewBox="0 0 360 257" fill="none">
    <path
      d="M356 152.5C356 101.359 325 4 190.259 4C59.0784 4 4 88.5 4 158C4 218 17.5 253 190.259 253C328.849 253 356 246 356 152.5Z"
      fill={fill}
      stroke="#5D3F35"
      strokeWidth={8}
    />
    <path
      d="M228 81.5V134.5M266 81.5V134.5"
      stroke="#5D3F35"
      strokeWidth={8}
      strokeLinecap="round"
    />
  </svg>
);

export default Dango;