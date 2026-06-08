import { scaleSqrt } from "d3";

export const Bubbles = ({ data, xScale, yScale, radiusScale }) => {
  return data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(d.gdpPercap)}
      cy={yScale(d.lifeExp)}
      r={radiusScale(d.pop)}
      fill="red"
      opacity={0.2}
    />
  ));
};

export default Bubbles;
