import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { deleteContact } from '../../redux/contactsItems/contacts-actions';

import Contact from './Contact';

import styles from './ContactList.module.css';
import '../../styles/animation.css';

const ContactList = ({ contacts, deleteOnClick }) => {
  return (
    <>
      <h2 className={styles.title}>Contacts</h2>
      <TransitionGroup
        appear={false}
        component="ul"
        children="li"
        className={styles.list}
      >
        {contacts.map(({ id, name, number }) => (
          <CSSTransition key={id} classNames="contacts" timeout={250}>
            <li className={styles.item}>
              <Contact name={name} number={number} />
              <button className={styles.button} id={id} onClick={deleteOnClick}>
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteOnClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: items.filter(
    ({ name }) => name && name.toLowerCase().includes(filter.toLowerCase()),
  ),
});

const mapDispatchToProps = dispatch => ({
  deleteOnClick: e => dispatch(deleteContact(e.target.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
