import React from 'react';
import PropTypes from 'prop-types';
import Steps, { Step } from 'rc-steps';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

const CustomStep = (props) => (
  <Step style={{ fontWeight: 'normal' }} {...props} />
);

const InvestorFormSteps = props => {
  const { page, currentUser } = props;
  return (
    <Steps className="custom" current={page}>
      <Step title="Complete profile" />
      <CustomStep title="Review" />
    </Steps>
  );
};

InvestorFormSteps.propTypes = {
  page: PropTypes.number.isRequired
};

export default InvestorFormSteps;
