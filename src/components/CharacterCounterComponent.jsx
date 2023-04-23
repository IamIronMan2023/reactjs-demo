import React, { Component } from "react";

export default class CountCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfCharacters: "", characters: "" };
  }

  onInputType = (event) => {
    let value = event.target.value;
    this.setState({ numberOfCharacters: value.length });
  };

  render() {
    return (
      <div>
        <h1>Character Counter</h1>
        <p>
          <label>Enter a text</label>
          <input
            type="text"
            name="characters"
            onChange={this.onInputType}
          ></input>
        </p>
        <p>
          <label>The text has {this.state.numberOfCharacters} characters</label>
        </p>
      </div>
    );
  }
}
