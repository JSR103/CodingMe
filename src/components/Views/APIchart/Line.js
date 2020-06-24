import React from "react";
//import "./LineChart.css";

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null
    };
  }
  // Getting X & Y -- Max & Min
  getX() {
    const { data } = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x
    };
  }
  getY() {
    const { data } = this.props;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y)
    };
  }
  // getting coords for svg
  getSvgX(x) {
    const { svgWidth, yLabelSize } = this.props;
    return yLabelSize + (x / this.getX().max) * (svgWidth - yLabelSize);
  }
  getSvgY(y) {
    const { svgHeight, xLabelSize } = this.props;
    const gY = this.getY();
    return (
      ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) /
      (gY.max - gY.min)
    );
  }
  // Making svg path
  makePath() {
    const { data } = this.props;
    let pathD =
      "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data
      .map((point, i) => {
        return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
      })
      .join("");

    return <path className="linechart_path" d={pathD} />;
  }
  // Building shared area
  makeArea() {
    const { data } = this.props;
    let pathD =
      "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data
      .map((point, i) => {
        return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
      })
      .join("");

    const x = this.getX();
    const y = this.getY();
    pathD +=
      "L " +
      this.getSvgX(x.max) +
      " " +
      this.getSvgY(y.min) +
      " " +
      "L " +
      this.getSvgX(x.min) +
      " " +
      this.getSvgY(y.min) +
      " ";

    return <path className="linechart_area" d={pathD} />;
  }
  // Building grid
  makeAxis() {
    const { yLabelSize } = this.props;
    const x = this.getX();
    const y = this.getY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(x.min) - yLabelSize}
          y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)}
          y2={this.getSvgY(y.min)}
          strokeDasharray="5"
        />
        <line
          x1={this.getSvgX(x.min) - yLabelSize}
          y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)}
          y2={this.getSvgY(y.max)}
          strokeDasharray="5"
        />
      </g>
    );
  }
  makeLabels() {
    const { svgHeight, svgWidth, xLabelSize, yLabelSize } = this.props;
    const padding = 5;
    return (
      <g className="linechart_label">
        {/* Y-axis label */}
        <text
          transform={`translate(${yLabelSize / 2}, 20)`}
          textAnchor="middle"
        >
          {this.getY().max.toLocaleString("us-EN", {
            style: "currency",
            currency: "USD"
          })}
        </text>
        <text
          transform={`translate(${yLabelSize / 2}, ${svgHeight -
            xLabelSize -
            padding})`}
          textAnchor="middle"
        >
          {this.getY().min.toLocaleString("us-EN", {
            style: "currency",
            currency: "USD"
          })}
        </text>
        {/* X-axis label*/}
        <text
          transform={`translate(${yLabelSize}, ${svgHeight})`}
          textAnchor="start"
        >
          {this.props.data[0].d}
        </text>
        <text
          transform={`translate(${svgWidth}, ${svgHeight})`}
          textAnchor="end"
        >
          {this.props.data[this.props.data.length - 1].d}
        </text>
      </g>
    );
  }
  // Finding mouse cursor
  getCoords(e) {
    const { svgWidth, data, yLabelSize } = this.props;
    const svgLocation = document
      .getElementsByClassName("linechart")[0]
      .getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth) / 2; //takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    let svgData = [];
    data.map((point, i) => {
      svgData.push({
        svgX: this.getSvgX(point.x),
        svgY: this.getSvgY(point.y),
        d: point.d,
        p: point.p
      });
    });

    let closestPoint = {};
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if (relativeLoc - yLabelSize < 0) {
      this.stopHover();
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint
      });
      this.props.onChartHover(relativeLoc, closestPoint);
    }
  }
  // stopping hover
  stopHover() {
    this.setState({ hoverLoc: null, activePoint: null });
    this.props.onChartHover(null, null);
  }
  // Making active point
  makeActivePoint() {
    const { pointRadius } = this.props;
    return (
      <circle
        className="linechart_point"
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    );
  }
  // MAKing the hover line
  createLine() {
    const { svgHeight, xLabelSize } = this.props;
    return (
      <line
        className="hoverLine"
        x1={this.state.hoverLoc}
        y1={-8}
        x2={this.state.hoverLoc}
        y2={svgHeight - xLabelSize}
      />
    );
  }

  render() {
    const { svgHeight, svgWidth } = this.props;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={"linechart"}
        onMouseLeave={() => this.stopHover()}
        onMouseMove={e => this.getCoords(e)}
      >
        <g>
          {this.makeAxis()}
          {this.makePath()}
          {this.makeArea()}
          {this.makeLabels()}
          {this.state.hoverLoc ? this.createLine() : null}
          {this.state.hoverLoc ? this.makeActivePoint() : null}
        </g>
      </svg>
    );
  }
}

// Defualt props
Line.defaultProps = {
  data: [],
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 900,
  xLabelSize: 20,
  yLabelSize: 80
};
