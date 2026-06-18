import { scaleLinear, format } from "d3";

const TICK_LENGTH = 6;

const formatTick = format("$,");

export const AxisBottom = ({ xScale, pixelsPerTick, boundsWidth, label }) => {
  const range = xScale.range();
  const width = range[1] - range[0];
  const numberOfTicks = Math.floor(width / pixelsPerTick);

  return (
    <>
      {/* X Axis Line*/}
      <line
        x1={range[0]}
        y1={0}
        x2={range[1]}
        y2={0}
        stroke="currentColor"
        fill="none"
      />
      {/* Ticks */}
      {xScale.ticks(numberOfTicks).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}>
            {formatTick(value)}
          </text>
        </g>
      ))}
      <g>
        <text
          x={xScale(50000)}
          y={TICK_LENGTH + 30}
          style={{
            fontSize: "10px",
            textAnchor: "end",
          }}>
          {label}
        </text>
      </g>
    </>
  );
};

export default AxisBottom;
