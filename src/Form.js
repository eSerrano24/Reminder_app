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
      $: 0,
      duration: 0,
      website: ''
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
          placeholder='pay bill'
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={this.handleChange}
          placeholder='reminder city'
          required
        />
        <label>$</label>
        <input type='number' placeholder='0.00'></input>
        <label>Duration</label>
        <input type='number' placeholder='hours'></input>
        <input type='number' placeholder='minutes'></input>
        <label>Deadline</label>
        <EdiText //
          type="date"
          value={""}
          onSave={handleSave}
        />
        <label>Website</label>
        <input type='text' placeholder='source link'></input>
        <button type="submit">Post</button>
        {/** add a calender to input the deadline for this form */}
      </form>
    );
  }
}

export default Form;
