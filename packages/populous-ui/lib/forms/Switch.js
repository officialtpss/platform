import React from 'react';
import styled from 'styled-components';
import ReactSwitch from 'react-switch';

const Switch =
  ({
     input,
    ...props,
   }) => {
    return (
      <ReactSwitch
        onColor="#E1E5EB"
        offColor="#fff"
        onHandleColor="#5CA0F6"
        offHandleColor="#A5ACB5"
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
        height={10}
        width={35}
        {...input}
        {...props}
      />
    );
  };

export default styled(Switch)`
  vertical-align: text-bottom;
  text-align: left !important;
  
  .react-switch-bg {
    border: 1px solid #E1E5EB;
    border-radius: 0 !important;
  }
`;
