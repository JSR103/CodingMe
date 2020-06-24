import React from "react";
import moment from "moment";
import Line from "./Line";
import InfoArea from "./InfoArea";
import Tools from "./Tools";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gettingData: true,
      data: null,
      onHover: null,
      activePoint: null
    };
  }

  handleChartHover(onHover, activePoint) {
    this.setState({
      onHover: onHover,
      activePoint: activePoint
    });
  }

  componentDidMount() {
    const getData = () => {
      fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
        .then(r => r.json())
        .then(bitcoinData => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi) {
            sortedData.push({
              d: moment(date).format("MMM DD"), // Date Formate
              p: bitcoinData.bpi[date].toLocaleString("us-EN", {
                style: "currency",
                currency: "USD"
              }),
              x: count,
              y: bitcoinData.bpi[date] // nunformatted price for ploting
            });
            count++;
          }
          this.setState({
            data: sortedData,
            gettingData: false
          });
        })
        .catch(e => {
          console.log(e);
        });
    };
    getData(); //calling function
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Price BTC Chart</h1>
        </div>
        <div className="row">
          {!this.state.gettingData ? <InfoArea data={this.state.data} /> : null}
        </div>
        <div className="row">
          <div className="popup">
            {this.state.onHover ? (
              <Tools
                onHover={this.state.onHover}
                activePoint={this.state.activePoint}
              />
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="chart">
            {!this.state.gettingData ? (
              <Line
                data={this.state.data}
                onChartHover={(a, b) => this.handleChartHover(a, b)}
              />
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="coindesk">
            {" "}
            Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a>
          </div>
        </div>
      </div>
    );
  }
}
