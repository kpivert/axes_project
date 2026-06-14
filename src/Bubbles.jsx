import { scaleSqrt } from "d3";

export const Bubbles = ({ data, xScale, yScale, radiusScale, colorScale }) => {
  return data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(d.gdpPercap)}
      cy={yScale(d.lifeExp)}
      r={radiusScale(d.pop)}
      fill={colorScale(d.continent)}
      fillOpacity={0.2}
      stroke={colorScale(d.continent)}
    />
  ));
};

export default Bubbles;
