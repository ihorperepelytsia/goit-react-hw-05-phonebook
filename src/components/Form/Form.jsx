import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.scss';

export default class Form extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    const { contacts, onAddContact, updateAlertText } = this.props;

    e.preventDefault();

    if (name !== '' && number !== '') {
      if (contacts.find(contact => contact.name === name) === undefined) {
        onAddContact({ ...this.state });
        this.setState({ name: '', number: '' });
      } else {
        updateAlertText(`${number}  is alredy in contacts`, true);
      }
    } else {
      updateAlertText(`No data entered, try again`, true);
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number
            <input
              type="number"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add Contact</button>
        </form>
      </>
    );
  }
}
