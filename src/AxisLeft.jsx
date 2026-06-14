import { scaleLinear } from "d3";

const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick, label }) => {
  const range = yScale.range();
  const height = range[0] - range[1];
  const numberOfTicks = Math.floor(height / pixelsPerTick);

  return (
    <>
      {/* Main Vertical Line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and Labels */}
      {yScale.ticks(numberOfTicks).map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}>
            {value}
          </text>
        </g>
      ))}

      <g>
        <text
          style={{
            fontSize: "10px",
            textAnchor: "start",
          }}>
          {label}
        </text>
      </g>
    </>
  );
};

export default AxisLeft;
