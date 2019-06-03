import React from 'react';
import PropTypes from 'prop-types';

import { RangeInput } from '../components/styled-components/Inputs';

const renderRangeInput = props => {
  return (
    <RangeInput
      id="averageInvoiceValue"
      max={props.max.toString()}
      min={props.min.toString()}
      onChange={e => props.input.onChange(e.target.value)}
      step={`${props.step}`}
      type="range"
      value={props.input.value || props.initialValue }
    />
  );
};

renderRangeInput.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired
};

export default renderRangeInput;
