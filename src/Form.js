import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      type: "",
      description: ""
    };

    this.state = this.initialState;
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { type, description } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
