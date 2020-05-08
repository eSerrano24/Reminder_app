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
      $: "",
      hours: "",
      minutes: "",
      website: "",
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
    let state = this.state;
    const { hours, minutes, $ } = this.state;
    if (this.initialState.deadline === null) {
      const date = new Date("").toUTCString();
      this.setState({
        deadline: date,
      });
    }
    this.initialState.deadline = "";

    let h = hours === "" ? 0 : hours;
    let m = minutes === "" ? 0 : minutes;
    let c = $ === "" ? 0 : $;
    this.setState(
      {
        hours: h,
        minutes: m,
        $: c,
      },
      () => {
        state.hours = h;
        state.minutes = m;
        state.$ = c;
        this.props.handleSubmit(state);
      }
    );

    this.setState(this.initialState);
  };

  render() {
    const {
      type,
      description,
      website,
      $,
      hours,
      minutes,
      deadline,
    } = this.state;
    const handleSave = (val) => {
      this.setState({
        deadline: val,
      });
    };

    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Item type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
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
        <label>Cost</label>
        <input
          type="number"
          step=".01"
          name="$"
          value={$}
          id="$"
          placeholder="$0.00"
          onChange={this.handleChange}
        ></input>
        <label>Estimated time to accomplish (hours and minutes)</label>
        <input
          type="number"
          name="hours"
          id="hours"
          value={hours}
          min="0"
          max="24"
          onChange={this.handleChange}
          placeholder="numbers only - in hours"
        ></input>
        <input
          type="number"
          name="minutes"
          id="minutes"
          value={minutes}
          min="0"
          max="59"
          onChange={this.handleChange}
          placeholder="numbers only - in minutes"
        ></input>
        <label>Must be completed by</label>
        <EdiText //
          type="date"
          value={deadline === null ? "" : deadline}
          onSave={handleSave}
          submitOnUnfocus={true}
        />
        <label>Organization website</label>
        <input
          type="text"
          name="website"
          id="website"
          value={website}
          onChange={this.handleChange}
          placeholder="source link"
        ></input>
        <button type="submit">Post</button>
        {/** add a calender to input the deadline for this form */}
      </form>
    );
  }
}

export default Form;
