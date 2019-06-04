import React from "react";
import ReactDOM from "react-dom";
// import { HotTable } from "@handsontable/react";
import { HotTable } from "../react-hansontable/src";

import "handsontable/dist/handsontable.full.css";

// const columnCount = 50;
// const rowCount = 10000;

const columnCount = 100;
const rowCount = 20000;

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
      renderer: function(instance, td, row, col, prop, value, cellProperties) {
        return ReactDOM.render(<span>{value}</span>, td);
      }
    });
  }
  return result;
}

export default class HotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        data: [["2019"]],
        columns: [{}]
      }
    };
  }
  clickHandler = () => {
    this.setState(
      {
        settings: {
          data: generateData(),
          columns: generateColumns(),
          autoColumnSize: false,
          rowHeights: 50,
          colWidths: 100
        }
      },
      () => {}
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
