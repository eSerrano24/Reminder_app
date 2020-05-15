import React, { Component } from "react";
import EdiText from "react-editext";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      name: "",
      value: "", // must be named value for dropdown
      description: "",
      deadline: "",
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
    this.props.formSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const {
      value,
      description,
      deadline,
    } = this.state;
    const handleDeadline = (val) => {
      this.setState({
        deadline: val
      });
    };
    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Item type</label>
        <input
          type="text"
          name="value"
          id="value"
          value={value}
          onChange={this.handleChange}
          placeholder="pay bill"
          required
        />
        <label>Organization</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
          placeholder="city of Reminder"
          required
        />
        <label>Must be completed by</label>
        <EdiText
          type="date"
          value={deadline === null ? "" : deadline}
          onSave={handleDeadline}
          submitOnUnfocus={true}
        />
        <button type="submit">Post</button>
        {/** add a calender to input the deadline for this form */}
      </form>
    );
  }
}

export default Form;
