import { useState } from "react";
import * as d3 from "d3";
import { data } from "./data";

import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Bubbles from "./Bubbles";

{
  /* Viz Dimensions */
}

const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = { top: 20, right: 30, bottom: 50, left: 50 };

function App() {
  const boundsWidth = WIDTH - MARGIN.left - MARGIN.right;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const gdpRange = d3.extent(data.map((d, i) => d.gdpPercap));
  const lifeExpRange = d3.extent(data.map((d, i) => d.lifeExp));
  const popRange = d3.extent(data.map((d, i) => d.pop));
  const BUBBLE_MIN_SIZE = 4;
  const BUBBLE_MAX_SIZE = 25;
  const pixelsPerTick = 60;
  const xScale = d3
    .scaleLinear()
    .domain([gdpRange[0], gdpRange[1]])
    .range([0, boundsWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([lifeExpRange[0], lifeExpRange[1]])
    .range([boundsHeight - 30, 0]);

  const radiusScale = d3
    .scaleSqrt()
    .domain([popRange[0], popRange[1]])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);

  // console.log(Object.entries(data).slice(0, 10)); This is how you get first 10 rows. NB: Non inclusive
  console.log(data);

  return (
    <>
      <h1>Howdy!</h1>
      <svg
        width={WIDTH}
        height={HEIGHT}
        // style={{ overflow: "visible" }}
      >
        <rect width="100%" height="100%" fill="#00468b" opacity={0.2}></rect>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <rect width="100%" height="100%" fill="#ff0000" opacity={0.1}></rect>
          <g transform={`translate(0, ${boundsHeight})`}>
            {/* Bottom Axis*/}
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={pixelsPerTick}
              label="GDP"
            />
          </g>
          {/* Left Axis*/}
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={50}
            label="Life Expectancy"
          />
          {/* Bubbles*/}
          <Bubbles
            data={data}
            xScale={xScale}
            yScale={yScale}
            radiusScale={radiusScale}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
