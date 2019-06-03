import React from 'react';

import { Switch } from '../components/styled-components/Invoices/Invoice';

const renderSwitch = ({
  anonymousBid,
  name,
  input,
  onChange = () => {},
  ...props,
}) =>{
  return (
    <Switch
      checked={anonymousBid}
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
      className="switch-checkbox m-r-10"
      name={name}
      onChange={onChange}
      {...input}
      {...props}
    />
  );
};

export default renderSwitch;
