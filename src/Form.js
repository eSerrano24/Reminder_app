import React, { Component } from "react";

class Form extends Component {
  constructor(props) {

    super(props);

    this.initialState = {
      type: "",
      description: "",
      created: null,
      value: null // will be numeric compared-matching with td_array Date()
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

    const temp = new Date(1969).toDateString();
    this.props.tdDates(temp, this.props.td_array.length-1);
    console.log('td_arr on submit: '+this.props.td_array);

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
