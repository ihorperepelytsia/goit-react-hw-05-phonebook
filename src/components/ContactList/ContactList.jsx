import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './contactList.scss';

const ContactList = ({ contacts, onDeleteContact }) => (
  <TransitionGroup component="ul">
    {contacts.map(({ id, name, number }) => (
      <CSSTransition key={id} timeout={250} classNames="list" unmountOnExit>
        <li className="user">
          <p className="user-name">{name}</p>
          <p className="user-number">{number}</p>
          <button name={id} onClick={onDeleteContact}>
            X
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
