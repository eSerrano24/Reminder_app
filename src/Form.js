import React, { Component } from "react";
import EdiText from "react-editext";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      type: "",
      description: "",
      deadline: null,
      created: new Date().getTime(),
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.initialState.deadline === null) {
      const date = new Date("").toUTCString();
      this.setState({
        deadline: date,
      });
      this.initialState.deadline = "";
    }
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { type, description } = this.state;
    const handleSave = (val) => {
      this.setState({
        deadline: val,
      });
      this.initialState.deadline = val;
    };

    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={this.handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
          required
        />
        <label>Deadline</label>
        <EdiText //
          type="date"
          value={""}
          onSave={handleSave}
        />
        <button type="submit">Post</button>
        {/** add a calender to input the deadline for this form */}
      </form>
    );
  }
}

export default Form;
