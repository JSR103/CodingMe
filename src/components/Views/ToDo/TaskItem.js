import React, { Component } from "react";

export default class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.createItem = this.createItem.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createItem(item) {
    return (
      <li onClick={() => this.delete(item.key)} key={item.key}>
        {item.text}
      </li>
    );
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createItem);

    return <ul className="theList">{listItems}</ul>;
  }
}
