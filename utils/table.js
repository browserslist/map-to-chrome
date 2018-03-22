const { JSDOM } = require("jsdom");
const SVGO = require("svgo");
const fs = require("fs");
const d3 = require("d3");

const input = {
  YaBrowser: require("../data/YaBrowser.json"),
  CocCoc: require("../data/coc_coc_browser.json"),
  "QQBrowser-win": require("../data/QQBrowser-win.json"),
  Electron: require("../data/Electron.json"),
};

const svgo = new SVGO();
const dom = new JSDOM();
const container = dom.window.document.createElement("div");

const graph = d3
  .select(container)
  .append("svg")
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle");

const output = {};

Object.entries(input).forEach(([browserName, data]) => {
  data.reverse().forEach(versions => {
    const chrome = versions[2];
    const browser = `${versions[0]}.${versions[1]}`;

    output[chrome] =
      output[chrome] ||
      Object.keys(input).reduce((el, key) => {
        el[key] = null;
        return el;
      }, {});

    const entry = output[chrome];

    if (!entry[browserName]) {
      entry[browserName] = browser;
    } else if (!entry[browserName].endsWith("+")) {
      entry[browserName] += "+";
    }
  });
});

const width = 90;
const height = 40;
const gutter = 6;
const headerHeight = 25;

graph
  .append("text")
  .attr("x", width / 2)
  .attr("y", headerHeight / 2)
  .attr("fill", "#6a737d")
  .attr("font-size", 13)
  .text("Chrome");

Object.keys(input).forEach((browser, index) => {
  const x = (width + gutter) * (index + 1);

  graph
    .append("text")
    .attr("x", x + width / 2)
    .attr("y", headerHeight / 2)
    .attr("fill", "#6a737d")
    .attr("font-size", 13)
    .text(browser);
});

Object.keys(output)
  .sort()
  .forEach((chrome, index) => {
    const y = (height + gutter) * index + headerHeight;

    graph
      .append("rect")
      .attr("x", 0 + 0.5)
      .attr("y", y - 0.5)
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 3)
      .attr("fill", "#f6f8fa")
      .attr("stroke", "#ddd");

    graph
      .append("text")
      .attr("x", width / 2)
      .attr("y", y + height / 2 + 5)
      .text(chrome);

    Object.values(output[chrome]).forEach((browser, index) => {
      if (!browser) return;
      const x = (width + gutter) * (index + 1);

      graph
        .append("rect")
        .attr("x", x + 0.5)
        .attr("y", y - 0.5)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 3)
        .attr("fill", "#f1f8ff")
        .attr("stroke", "#c8e1ff");

      graph
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height / 2 + 5)
        .text(browser);
    });
  });

const githubReadmeWidth = 888;
const svgWidth = (width + gutter) * (Object.keys(input).length + 1);
const svgHeight = (height + gutter) * Object.keys(output).length + headerHeight - gutter;

graph.attr("viewBox", `0 0 ${Math.max(svgWidth, githubReadmeWidth)} ${svgHeight}`);

svgo.optimize(graph.node().outerHTML).then(result => {
  fs.writeFileSync("table.svg", result.data);
});
