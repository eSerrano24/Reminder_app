import React, { Component } from "react";

class Form extends Component {
  constructor(props) {

    super(props);

    this.initialState = {
      type: "",
      description: "",
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

    const temp = 'December 31, 1969';
    // we don't need to use setState?
    this.props.td_array.push(temp);
    this.props.tdExpire(new Date(temp).getTime());

    alert("size of table array " + this.props.td_array.length);
    alert("table array: "+this.props.td_array);
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
