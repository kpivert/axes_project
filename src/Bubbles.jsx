import { scaleSqrt } from "d3";

export const Bubbles = ({
  data,
  xScale,
  yScale,
  radiusScale,
  colorScale,
  cohortCountries,
}) => {
  return data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(d.gdpPercap)}
      cy={yScale(d.lifeExp)}
      r={radiusScale(d.pop)}
      fill={colorScale(d.continent)}
      // fillOpacity={0.2}
      fillOpacity={cohortCountries.has(d.country) ? 0.9 : 0.2}
      stroke={
        cohortCountries.has(d.country) ? "#000000" : colorScale(d.continent)
      }
      strokeWidth={cohortCountries.has(d.country) ? 1.2 : 0.5}
    />
  ));
};

export default Bubbles;
