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
  const BUBBLE_MAX_SIZE = 30;
  const pixelsPerTick = 60;
  const xScale = d3
    .scaleLinear()
    // .domain([gdpRange[0], gdpRange[1]])
    .domain([0, d3.max(data.map((d) => d.gdpPercap))])
    // .range([10, boundsWidth]);
    .range([10, boundsWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([lifeExpRange[0], lifeExpRange[1]])
    .range([boundsHeight - 30, 10])
    .nice();

  const radiusScale = d3
    .scaleSqrt()
    .domain([popRange[0], popRange[1]])
    .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.continent))
    // .range(d3.schemeDark2);
    .range(d3.schemeCategory10);
  // .range(d3.schemeObservable10);

  // console.log(Object.entries(data).slice(0, 10)); This is how you get first 10 rows. NB: Non inclusive
  // const unique = [...new Set(data.map((d) => d.continent))]; This is how you get unique values
  const uniqueCountries = [...new Set(data.map((d) => d.country))];
  console.log(d3.min(data.map((d) => d.gdpPercap)));
  console.log(xScale.ticks());
  console.log(boundsWidth);
  console.log(d3.extent(data.map((d) => d.gdpPercap)));

  return (
    <>
      <div
        className="flex flex-col justify-center mx-auto text-left w-[700px]"
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   width: 700,
        //   margin: "0 auto",
        //   textAlign: "left",
        // }}
      >
        <h1 className="font-display text-3xl">Up and To the Right</h1>
        <h3 className="font-sans">Hans Rosling's Gapminder Data from 2007</h3>
        <svg
          width={WIDTH}
          height={HEIGHT}
          // style={{ overflow: "visible" }}
        >
          {/* Background Rect for Whole SVG */}
          {/* <rect width="100%" height="100%" fill="blue" opacity={0.1} /> */}
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            {/* Background Rect for Bounds Area */}
            {/* <rect
              width="100%"
              height="100%"
              // fill="red"
              opacity={1}
              // stroke="#000"
              // strokeWidth="5"
            />
            <rect
              width="100%"
              height="100%"
              fill="#fff"
              // opacity={1}
              // stroke="#000"
              // strokeWidth="30"
            /> */}
            <g transform={`translate(0, ${boundsHeight})`}>
              {/* Bottom Axis*/}
              <AxisBottom
                xScale={xScale}
                pixelsPerTick={pixelsPerTick}
                label="GDP (2007 $US)"
              />
            </g>
            {/* Left Axis*/}
            <AxisLeft
              yScale={yScale}
              pixelsPerTick={50}
              label="Life Expectancy (Years)"
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
