import React from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, FormFeedback, FormText } from 'reactstrap';
import classNames from 'classnames';
import DateTime from 'react-datetime';
import { SingleDatePicker } from 'react-dates';
import styled from 'styled-components';

import { formatDateTime } from '../utils/formatter';

let custom_focus = false;
//https://github.com/YouCanBookMe/react-datetime/issues/325
const renderDateTimeFieldComponent = ({
  input,
  label,
  helperText,
  disabled,
  noBorder,
  enableOutsideRange,
  className,
  placeholder,
  ...props
}) => {
  const {meta: {touched, error}} = props;
  const valid = !(touched && error);
  // https://www.npmjs.com/package/classnames
  const classes = classNames({
    success: valid,
    danger: error
  });
  const validDate = function (current) {
    if (enableOutsideRange) {
      return false;
    }
    const today = DateTime.moment();
    return current.isBefore(today);
  }
  const date = input.value === '' ? null : DateTime.moment(input.value);

  return (

    <div className={className}>
      <FormGroup color={classes}>
        {label && <Label>{label}</Label>}
        {/* We can't use an styled-component Input, so we add the style object as an input prop*/}
        <SingleDatePicker
          disabled={disabled}
          onClose={() => {
            custom_focus = false
            input.onBlur()
           }
          }
          noBorder={true}
          isOutsideRange={e => validDate(e)}
          placeholder={placeholder || ''}
          numberOfMonths={1}
          verticalHeight={277}
          enableOutsideDays
          hideKeyboardShortcutsPanel
          date={date}
          displayFormat="DD/MM/YYYY"
          onDateChange={param => {
            input.onChange(formatDateTime(param));
          }}
          focused={custom_focus}
          onFocusChange={() => {
            input.onFocus()
            custom_focus = true;
            }
          }
        />

        {helperText && <p>{helperText}</p>}
        {touched && error && <div className={"error"}>{error}</div>}
      </FormGroup>
    </div>
  );
};

renderDateTimeFieldComponent.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};


export const renderDateTimeField = styled(renderDateTimeFieldComponent)`
  .DateInput_input[disabled]{
	  background: white;
	  color: ${props => props.theme.newColors.gray};
  }
`;
