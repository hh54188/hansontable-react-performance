import React from "react";
import ReactDOM from "react-dom";
// import { HotTable } from "@handsontable/react";
import { HotTable } from "../react-handsontable/src";
import faker from 'faker'

import "handsontable/dist/handsontable.full.css";

const columnCount = 20;
const rowCount = 10000;

function generateData() {
  const data = [];

  for (let i = 0; i < rowCount; i++) {
    data[i] = [];
    for (let j = 0; j < columnCount; j++) {
      data[i].push(faker.name.findName());
    }
  }
  return data;
}

function generateColumns() {
  const result = [];
  for (let i = 0; i < columnCount; i++) {
    result.push({
      dataKey: i.toString(),
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

class HotTableWrapper extends React.Component {
  getDerivedStateFromProps() {
    console.log('HOTTABLEWRAPPER GETDERIVEDSTATEFROMPROPS');
  }
  componentDidUpdate() {
    // console.log('HOTTABLEWRAPPER DID UPDATE');
  }
  render() {
    console.log("HOTTABLEWRAPPER RENDER")
    return (
      <HotTable
        ref={this.props.tableRef}
        data={this.props.data}
        columns={this.props.columns}
        autoColumnSize={false}
        autoRowSize={false}
        rowHeights={50}
        colWidths={100}
        filters={true}
        width={this.props.width}
        height={this.props.height}
        columnSorting={true}
        afterUpdateSettings={() => {
          console.log('afterUpdateSettings');
        }}
      ></HotTable>
    )

  }
}

export default class HotApp extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      settings: {
        data: [],
        columns: [],
      }
    };
  }

  get filterPlugin() {
    return this.tableRef.current.hotInstance.getPlugin('filters');
  }

  get sortPlugin() {
    return this.tableRef.current.hotInstance.getPlugin('columnSorting');
  }

  clickHandler = () => {
    this.setState(
      {
        settings: {
          ...this.state.settings,
          data: generateData(),
          columns: generateColumns()
        },
        useless: Math.random()
      },
      () => {
        // console.log("SORT BEGIN");
        // this.sortHandler();
        // this.filterHandler();
      }
    );
  };
  sortHandler = () => {
    const sortStart = +new Date;
    this.sortPlugin.clearSort();
    this.sortPlugin.sort({ column: 1, sortOrder: 'desc' });
    console.log("Sort Cost------>", +new Date - sortStart);
  }
  filterHandler = () => {
    const filterStart = +new Date;
    this.filterPlugin.clearConditions();
    this.filterPlugin.addCondition(2, 'by_value', [faker.name.findName(), faker.name.findName()])
    this.filterPlugin.addCondition(3, 'by_value', [faker.name.findName(), faker.name.findName()])
    this.filterPlugin.addCondition(4, 'by_value', [faker.name.findName(), faker.name.findName()])
    this.filterPlugin.filter()
    console.log("Filter Cost------>", +new Date - filterStart);
  }
  randomUselessValue = () => {
    this.setState({
      useless: Math.random(),
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Random Data</button>
        <button onClick={this.sortHandler}>Sort Data</button>
        <button onClick={this.filterHandler}>Filter Data</button>
        <button onClick={this.randomUselessValue}>Random Useless</button>
        <HotTableWrapper
          useless={this.state.useless}
          tableRef={this.tableRef}
          data={this.state.settings.data}
          columns={this.state.settings.columns}
          width={window.innerWidth}
          height={window.innerHeights}
        ></HotTableWrapper>
      </div>
    );
  }
}

ReactDOM.render(<HotApp />, document.querySelector("body"));
