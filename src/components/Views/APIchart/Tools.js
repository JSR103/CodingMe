import React from "react";

export default class Tools extends React.Component {
  render() {
    const { onHover, activePoint } = this.props;
    const svgLocation = document
      .getElementsByClassName("linechart")[0]
      .getBoundingClientRect();

    let placementStyles = {};
    let width = 100;
    placementStyles.width = width + "px";
    placementStyles.left = onHover + svgLocation.left - width / 2;

    return (
      <div className="hover" style={placementStyles}>
        <div className="date">{activePoint.d}</div>
        <div className="price">{activePoint.p}</div>
      </div>
    );
  }
}
