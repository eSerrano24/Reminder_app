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
      $: 0.00,
      hours: 0,
      minutes: 0,
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
    const { type, description, website } = this.state;
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
        <label>Payment</label>
        <input type='number' step='.01' name="$" id="$" placeholder='$0.00' onChange={this.handleChange}></input>
        <label>Duration</label>
        <input type='number' name="hours" id="hours" onChange={this.handleChange} placeholder='hours'></input>
        <input type='number' name="minutes" id="minutes" onChange={this.handleChange} placeholder='minutes'></input>
        <label>Deadline</label>
        <EdiText //
          type="date"
          value={""}
          onSave={handleSave}
        />
        <label>Website</label>
        <input type='text' name="website" id="website" value={website} onChange={this.handleChange} placeholder='source link'></input>
        <button type="submit">Post</button>
        {/** add a calender to input the deadline for this form */}
      </form>
    );
  }
}

export default Form;
