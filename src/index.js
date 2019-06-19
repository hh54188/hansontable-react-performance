import React from "react";
import ReactDOM from "react-dom";
// import { HotTable } from "@handsontable/react";
import { HotTable } from "../react-handsontable/src";

import "handsontable/dist/handsontable.full.css";

const columnCount = 20;
const rowCount = 8000;

// const columnCount = 20;
// const rowCount = 1000;

// const columnCount = 50;
// const rowCount = 10000;

// const columnCount = 100;
// const rowCount = 20000;

function generateData() {
  const data = [];

  for (let i = 0; i < rowCount; i++) {
    data[i] = [];
    for (let j = 0; j < columnCount; j++) {
      data[i].push(`${i}, ${j}, ${Math.random()}`);
    }
  }
  return data;
}

function generateColumns() {
  const result = [];
  for (let i = 0; i < columnCount; i++) {
    result.push({
      renderer: function (instance, td, row, col, prop, value, cellProperties) {
        return ReactDOM.render(<span>{value}</span>, td);
      }
    });
  }
  return result;
}

// https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
function sortByObjectValue(list) {
  return Object.keys(list).sort(function (a, b) {
    return list[b] - list[a];
  });
}

export default class HotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        data: [["2019"]],
        columns: [{}],

        // autoColumnSize: true,
        // autoRowSize: true,

        autoColumnSize: false,
        autoRowSize: false,
        rowHeights: 50,
        colWidths: 100,

        afterOnCellMouseDown: (event, coords) => {
          console.log("afterOnCellMouseDown");
        },
        afterOnCellMouseUp: (event, coords) => {
          console.log("afterOnCellMouseUp");
        },
        afterFilter: filterConfig => {
          console.log("afterFilter");
        },
        afterColumnSort: (currentSortConfig, destinationSortConfigs) => {
          console.log("afterColumnSort");
        }
      }
    };
  }
  clickHandler = () => {
    const startTime = performance.now();

    window.runFunctionInvokeCount = 0;
    window.hookStatistics = {};
    window.getGlobalHandlerTotal = 0;
    window.callGlobalHandlerTotal = 0;
    window.getLocalHandlerTotal = 0;
    window.newColumnSettingsTotal = 0;

    this.setState(
      {
        settings: {
          ...this.state.settings,
          data: generateData(),
          columns: generateColumns()
        }
      },
      () => {
        console.table([
          ["render", performance.now() - startTime],
          ["runFunctionInvokeCount", window.runFunctionInvokeCount],
          [],
          ["getGlobalHandlerTotal", window.getGlobalHandlerTotal],
          [
            "average get global handler time",
            window.getGlobalHandlerTotal / window.runFunctionInvokeCount
          ],
          [],
          ["getLocalHandlerTotal", window.getLocalHandlerTotal],
          [
            "average get local handler time",
            window.getLocalHandlerTotal / window.runFunctionInvokeCount
          ],
          [],
          ["callGlobalHandlerTotal", window.callGlobalHandlerTotal],
          [],
          ["newColumnSettingsTotal", window.newColumnSettingsTotal],
          ["newColumnSettingsInvokeCount", window.newColumnSettingsInvokeCount],
          ["average newColumnSettings time", window.newColumnSettingsTotal / window.newColumnSettingsInvokeCount]
        ]);
        console.log(window.hookStatistics, sortByObjectValue(window.hookStatistics));
      }
    );
  };
  render() {
    const { settings } = this.state;
    return (
      <div>
        <button onClick={this.clickHandler}>Random Data</button>
        <HotTable settings={settings} />
      </div>
    );
  }
}

ReactDOM.render(<HotApp />, document.querySelector("body"));
