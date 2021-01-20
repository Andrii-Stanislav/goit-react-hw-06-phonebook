import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { createContact } from '../../redux/contactsItems/contacts-actions';

import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  heandleInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  createNewContact = event => {
    event.preventDefault();

    if (this.verifyNewContact(this.state)) {
      this.props.onSubmit({ id: uuidv4(), ...this.state });
    }

    this.setState({
      name: '',
      number: '',
    });
  };

  verifyNewContact = ({ name: newName, number: newNumber }) => {
    let verify = true;
    this.props.contacts.forEach(({ name, number }) => {
      if (
        name.toLowerCase() === newName.toLowerCase() ||
        newNumber === number
      ) {
        this.props.showAlert();
        verify = false;
      }
    });

    return verify;
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.createNewContact}>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Awesome name"
            value={this.state.name}
            onChange={this.heandleInput}
            required
          />
        </label>
        <label className={styles.label}>
          Phone <span className={styles.example}>(000-00-00)</span>:
          <input
            className={styles.input}
            name="number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            maxLength="9"
            placeholder="Cool phonenumber"
            value={this.state.number}
            onChange={this.heandleInput}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Create contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({
  contacts: contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ id, name, number }) =>
    dispatch(createContact({ id, name, number })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
