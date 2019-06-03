import 'react-dates/lib/css/_datepicker.css';
import '../../libs/react-dates/index.css';

import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { END_DATE, START_DATE } from 'react-dates/constants'
import { LinkButton } from '../styled-components/Buttons';

const presetWrapperStyle = {
  padding: '0',
  textAlign: 'right',
  marginTop: '-8px'
};

const presetButtonStyle = {
  padding: '0.3em 1em',
  letterSpacing: '0.5px',
  fontSize: '14px'
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate || null,
      endDate: props.initialEndDate || null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.renderDatePresets = this.renderDatePresets.bind(this);
  }

  componentWillReceiveProps(props) {
    // default values after reset
    if (props.startDate === null && !!this.state.startDate || props.endDate === null && !!this.state.endDate) {
      this.setState({ startDate: null })
      this.setState({ endDate: null })
    }
  }

  onDatesChange({ startDate, endDate }) {
    if (this.props.onChange) {
      this.props.onChange({ startDate, endDate });
    }
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  renderDatePresets() {
    const { startDate, endDate } = this.state;
    return (
      <div style={presetWrapperStyle}>
        <LinkButton
          size={'12px'}
          onClick={() => {
            this.onDatesChange({ startDate: null, endDate: null });
            this.setState({focusedInput: null});
          }}
          style={presetButtonStyle}>
          Cancel
        </LinkButton>
        <LinkButton
          size={'12px'}
          onClick={() => {
            this.onDatesChange({ startDate: startDate, endDate: endDate });
            this.setState({focusedInput: null});
          }}
          style={presetButtonStyle}>
          Ok
        </LinkButton>
      </div>
    );
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const inner = this.props.inner || {};

    return (
      <div className={this.props.className}>
        <DateRangePicker
          disabled={this.props.disabled}
          startDateId={START_DATE}
          endDateId={END_DATE}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={this.props.startDate || startDate}
          endDate={this.props.endDate || endDate}
          numberOfMonths={1}
          verticalHeight={277}
          noBorder
          enableOutsideDays={true}
          isOutsideRange={() => false}
          hideKeyboardShortcutsPanel
          renderCalendarInfo={this.renderDatePresets}
          displayFormat="DD-MM-YYYY"
          {...inner}
        />
      </div>
    );
  }
}

export default DateRangePickerWrapper;
