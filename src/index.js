import React from "react";
import ReactDOM from "react-dom";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.full.css";

function generateData() {
  const rowCount = 1000;
  const columnCount = 100;
  const data = []

  for (let i = 0; i < rowCount; i++) {
    data[i] = []
    for (let j = 0; j < columnCount; j++) {
      data[i].push(`${i}, ${j}, ${Math.random()}`);
    }
  }
  return data
}

export default class HotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13]
      ]
    };
  }
  clickHandler = () => {
    this.setState({
      data: generateData()
    });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.clickHandler}>Random Data</button>
        <HotTable
          data={data}
          colHeaders={true}
          rowHeaders={true}
        />
      </div>
    );
  }
}

ReactDOM.render(<HotApp />, document.querySelector("body"));
