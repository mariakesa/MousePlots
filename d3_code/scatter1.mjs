import fs from 'fs';
import * as d3 from 'd3';
import { JSDOM } from 'jsdom';

// Load data from JSON
const data = JSON.parse(fs.readFileSync('/home/maria/MousePlots/plot_data/scatter1.json', 'utf8'));

// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create a JSDOM instance to emulate a DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const body = d3.select(dom.window.document).select("body");

// Create the SVG container
const svg = body.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Extract the x and y values from the data
const xValues = data.map(d => d.x);
const yValues = data.map(d => d.y);

// Define scales
const xScale = d3.scaleLinear()
    .domain(d3.extent(xValues))
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain(d3.extent(yValues))
    .range([height, 0]);

// Define axes
const xAxis = d3.axisBottom(xScale).ticks(10);
const yAxis = d3.axisLeft(yScale).ticks(10);

// Add the X axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
  .selectAll("text")
    .style("font-family", "sans-serif")
    .style("font-size", "12px");

// Add the Y axis
svg.append("g")
    .call(yAxis)
  .selectAll("text")
    .style("font-family", "sans-serif")
    .style("font-size", "12px");

// Add points to the scatter plot
svg.selectAll("circle")
    .data(data)
  .enter().append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 4)
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.7);

// Add X axis label
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("X Axis Label");

// Add Y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .text("Y Axis Label");

// Add a title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("My Scatter Plot");

// Save the SVG to a file
fs.writeFileSync('/home/maria/MousePlots/svg/scatter_plot.svg', dom.window.document.querySelector("svg").outerHTML);
console.log("scatter_plot.svg has been created!");
