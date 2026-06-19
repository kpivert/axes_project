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

const studentCountries = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

const studentCountryList = new Set(studentCountries.map((d) => d.country));

function App() {
  const boundsWidth = WIDTH - MARGIN.left - MARGIN.right;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const gdpRange = d3.extent(data.map((d, i) => d.gdpPercap));
  const lifeExpRange = d3.extent(data.map((d, i) => d.lifeExp));
  const popRange = d3.extent(data.map((d, i) => d.pop));
  const BUBBLE_MIN_SIZE = 4;
  const BUBBLE_MAX_SIZE = 30;
  const pixelsPerTick = 60;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.gdpPercap))])
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
    .range(d3.schemeCategory10);

  const uniqueCountries = [...new Set(data.map((d) => d.country))];
  return (
    <>
      <div className="flex flex-col justify-center mx-auto text-left w-[700px]">
        <h1 className="font-display text-3xl">Up and To the Right</h1>
        <h3 className="font-sans">Hans Rosling's Gapminder Data from 2007</h3>
        <svg width={WIDTH} height={HEIGHT}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
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
              cohortCountries={studentCountryList}
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default App;
