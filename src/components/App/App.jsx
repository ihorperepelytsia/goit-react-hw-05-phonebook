import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './animationTransition.scss';

import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';
import filterContact from '../../utils/filterContact';
import { v4 } from 'uuid';
import Alert from '../Alert/Alert';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isLoadingPage: false,
    alertText: '',
    alertLoading: false,
  };

  updateAlertText = (value, bool) => {
    this.setState({ alertText: value, alertLoading: bool });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = contact => {
    const contactToAdd = {
      id: v4(),
      ...contact,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  deleteContact = ({ target: { name } }) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(item => item.id !== name)],
    }));
  };

  componentDidMount() {
    this.setState({
      isLoadingPage: true,
    });

    const getLocalStorageContacts = localStorage.getItem('Contacts');
    if (getLocalStorageContacts) {
      this.setState({ contacts: JSON.parse(getLocalStorageContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }

    if (prevState.alertLoading !== this.state.alertLoading) {
      setTimeout(() => this.setState({ alertLoading: false }), 2500);
    }
  }

  render() {
    const {
      contacts,
      filter,
      isLoadingPage,
      alertText,
      alertLoading,
    } = this.state;
    const filteredContacts = filterContact(contacts, filter);

    return (
      <>
        <div className="box">
          <CSSTransition
            in={isLoadingPage}
            timeout={1250}
            classNames="headline"
            unmountOnExit
          >
            <h1>Phonebook</h1>
          </CSSTransition>

          <CSSTransition
            in={alertLoading}
            timeout={1250}
            classNames="alertAnimation"
            unmountOnExit
          >
            <Alert text={alertText} />
          </CSSTransition>
        </div>
        <Form
          onAddContact={this.addContact}
          contacts={contacts}
          updateAlertText={this.updateAlertText}
        />

        <h2>Contacts</h2>

        <CSSTransition
          in={contacts.length >= 2}
          timeout={250}
          classNames="filter"
          unmountOnExit
        >
          <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
