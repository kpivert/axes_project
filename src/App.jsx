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
const MARGIN = {
  top: 20,
  right: 30,
  bottom: 50,
  left: 50,
};

function App() {
  const boundsWidth = WIDTH - MARGIN.left - MARGIN.right;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const gdpRange = d3.extent(data.map((d, i) => d.gdpPercap));
  const lifeExpRange = d3.extent(data.map((d, i) => d.lifeExp));
  const popRange = d3.extent(data.map((d, i) => d.pop));
  // const continents = data.map((d) => d.continent);
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

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.continent))
    // .range(d3.schemeCategory10);
    .range(d3.schemeObservable10);

  // console.log(Object.entries(data).slice(0, 10)); This is how you get first 10 rows. NB: Non inclusive
  // const unique = [...new Set(data.map((d) => d.continent))]; This is how you get unique values
  const uniqueCountries = [...new Set(data.map((d) => d.country))];
  console.log(uniqueCountries);

  return (
    <>
      <div
        style={{
          width: 700,
          textAlign: "left",
        }}>
        <h1>Howdy! This is Gapminder Data from 2007</h1>
        <svg
          width={WIDTH}
          height={HEIGHT}
          // style={{ overflow: "visible" }}
        >
          {/* Background Rect for Whole SVG */}
          <rect width="100%" height="100%" fill="blue" opacity={1} />
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            {/* Background Rect for Bounds Area */}
            <rect
              width="100%"
              height="100%"
              // fill="red"
              opacity={1}
              stroke="#000"
              strokeWidth="5"
            />
            <rect
              width="100%"
              height="100%"
              fill="#fff"
              opacity={1}
              // stroke="#000"
              // strokeWidth="30"
            />
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
              colorScale={colorScale}
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default App;
