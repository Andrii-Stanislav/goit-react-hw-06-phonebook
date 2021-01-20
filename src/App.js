import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import Alert from './Components/Alert';

import { CSSTransition } from 'react-transition-group';

import styles from './styles/App.module.css';
import './styles/animation.css';
import './styles/index.css';

class App extends Component {
  state = {
    alert: false,
  };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    const { contacts } = this.props;
    const { alert } = this.state;

    return (
      <div className={styles.mainDiv}>
        <div className={styles.container}>
          <CSSTransition
            in={true}
            appear={true}
            timeout={250}
            classNames="title"
            unmountOnExit
          >
            <h1 className={styles.title}>Phonebook</h1>
          </CSSTransition>
          <ContactForm showAlert={this.showAlert} />
          <CSSTransition
            in={contacts.length > 1}
            appear={true}
            timeout={250}
            classNames="fade"
            unmountOnExit
          >
            <Filter />
          </CSSTransition>
          <ContactList />
          <CSSTransition
            in={alert}
            appear={true}
            timeout={250}
            classNames="fade"
            unmountOnExit
          >
            <Alert text="Contact is already exist" />
          </CSSTransition>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts: { items } }) => ({
  contacts: items,
});

export default connect(mapStateToProps, null)(App);
