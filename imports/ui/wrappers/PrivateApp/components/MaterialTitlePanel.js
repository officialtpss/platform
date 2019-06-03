import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const styles = {
  header: {
    backgroundColor: '#2b3f5c',
    padding: '0px',
    height: '60px'
  },
  body: {
    marginLeft: 'calc(100% - 60px)',
    width: '60px',
    height: '100%',
    cursor: 'pointer'
  }
};

const MaterialTitlePanel = (props) => {
  return (
    <div style={props.style}>
      <div style={styles.header}>{props.title}
        <div style={styles.body} onClick={()=>{props.onSetOpen(false);}}>
          <div className={'hamburger ' + classnames({ active: props.isOpen })}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.object,
  isOpen: PropTypes.bool
};

export default MaterialTitlePanel;
