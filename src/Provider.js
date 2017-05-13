import React, { Component, PropTypes } from 'react';

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};

export default Provider;
