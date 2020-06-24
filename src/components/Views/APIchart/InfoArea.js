import React, { Component } from "react";
import moment from "moment";

export default class InfoArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null,
      gbpPrice: null,
      eurPrice: null
    };
  }
  componentDidMount() {
    this.getData = () => {
      const { data } = this.props;
      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(r => r.json())
        .then(bitcoinData => {
          const price = bitcoinData.bpi.USD.rate_float;
          const change = price - data[0].y;
          const changeP = ((price - data[0].y) / data[0].y) * 100;

          this.setState({
            currentPrice: bitcoinData.bpi.USD.rate_float,
            monthChangeD: change.toLocaleString("us-EN", {
              style: "currency",
              currency: "USD"
            }),
            monthChangeP: changeP.toFixed(2) + "%",
            updatedAt: bitcoinData.time.updated,
            gbpPrice: bitcoinData.bpi.GBP.rate_float,
            eurPrice: bitcoinData.bpi.EUR.rate_float
          });
        })
        .catch(e => {
          console.log(e);
        });
    };
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  componentWillUnmount() {
    clearInterval(this.refresh);
  }
  render() {
    return (
      <div className="info-area">
        <div>
          {this.state.gbpPrice ? (
            <p>
              GBP:{" "}
              {this.state.gbpPrice.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP"
              })}{" "}
              | EUR:{" "}
              {this.state.eurPrice.toLocaleString("EUR", {
                style: "currency",
                currency: "EUR"
              })}
            </p>
          ) : null}
        </div>
        <div className="data-container">
          {this.state.currentPrice ? (
            <div className="box left">
              <div className="heading">
                {this.state.currentPrice.toLocaleString("us-EN", {
                  style: "currency",
                  currency: "USD"
                })}
              </div>
              <div className="subtext">
                {"Updated " + moment(this.state.updatedAt).fromNow()}
              </div>
            </div>
          ) : null}
          {this.state.currentPrice ? (
            <div className="box middle">
              <div className="heading">{this.state.monthChangeD}</div>
              <div className="subtext">Change Since Last Month (USD)</div>
            </div>
          ) : null}
          <div className="box right">
            <div className="heading">{this.state.monthChangeP}</div>
            <div className="subtext">Change Since Last Month (%)</div>
          </div>
        </div>
      </div>
    );
  }
}
