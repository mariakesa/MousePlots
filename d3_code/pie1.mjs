import fs from 'fs';
import * as d3 from 'd3';
import { JSDOM } from 'jsdom';

// Load data from JSON
const data = JSON.parse(fs.readFileSync('/home/maria/MousePlots/plot_data/pie.json', 'utf8'));

// Create a JSDOM instance to emulate a DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const body = d3.select(dom.window.document).select("body");

const margin = { top: 40, right: 30, bottom: 50, left: 60 };
const size = { width: 800, height: 600 };

console.log(data)

const pie = d3.pie();
const arcs = pie([data.zero, data.events]);

const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(size.width, sizeheight) / 2 - 1);

  // Create the SVG container.
const svg = body.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");


console.log(arcs)