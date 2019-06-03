import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Push scroll position to top on _push_. Taken from:
// https://github.com/ReactTraining/react-router/blob/dfdcfacce4b5948db203500280d3e9fdd1f4cbf3/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
