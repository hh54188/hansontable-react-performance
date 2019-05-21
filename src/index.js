import React from "react";
import ReactDOM from "react-dom";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.full.css";

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
  generateData = () => {
    this.setState({
      data: [
        ["2019", 11, 12, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13]
      ]
    });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={this.generateData}>Random Data</button>
        <HotTable
          data={data}
          colHeaders={true}
          rowHeaders={true}
          width="600"
          height="300"
        />
      </div>
    );
  }
}

ReactDOM.render(<HotApp />, document.querySelector("body"));
