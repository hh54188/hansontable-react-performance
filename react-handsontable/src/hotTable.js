import React from "react";
import Handsontable from "../handsontable/dist/handsontable";
import { SettingsMapper } from "./settingsMapper";

/**
 * A Handsontable-ReÒactJS wrapper.
 *
 * To implement, use the `HotTable` tag with properties corresponding to Handsontable options.
 * For example:
 *
 * ```js
 * <HotTable id="hot" data={dataObject} contextMenu={true} colHeaders={true} width={600} height={300} stretchH="all" />
 *
 * // is analogous to
 * let hot = new Handsontable(document.getElementById('hot'), {
 *    data: dataObject,
 *    contextMenu: true,
 *    colHeaders: true,
 *    width: 600
 *    height: 300
 * });
 *
 * ```
 *
 * @class HotTable
 */
export class HotTable extends React.Component {
  settingsMapper = new SettingsMapper();
  /**
   * Set the reference to the main Handsontable DOM element.
   *
   * @param {HTMLElement} element The main Handsontable DOM element.
   */
  setHotElementRef(element) {
    this.hotElementRef = element;
  }

  /**
   * Initialize Handsontable after the component has mounted.
   */
  componentDidMount() {
    const newSettings = this.settingsMapper.getSettings(this.props);
    this.hotInstance = new Handsontable(this.hotElementRef, newSettings);
  }

  /**
   * Call the `updateHot` method and prevent the component from re-rendering the instance.
   *
   * @param {Object} nextProps
   * @param {Object} nextState
   * @returns {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.updateHot(this.settingsMapper.getSettings(nextProps));

    return false;
  }

  /**
   * Destroy the Handsontable instance when the parent component unmounts.
   */
  componentWillUnmount() {
    this.hotInstance.destroy();
  }

  /**
   * Render the table.
   */
  render() {
    this.id =
      this.props.id ||
      "hot-" +
        Math.random()
          .toString(36)
          .substring(5);
    this.className = this.props.className || "";
    this.style = this.props.style || {};

    return (
      <div
        ref={this.setHotElementRef.bind(this)}
        id={this.id}
        className={this.className}
        style={this.style}
      />
    );
  }

  /**
   * Call the `updateSettings` method for the Handsontable instance.
   *
   * @param {Object} newSettings The settings object.
   */
  updateHot(newSettings) {
    this.hotInstance.updateSettings(newSettings, false);
  }
}
