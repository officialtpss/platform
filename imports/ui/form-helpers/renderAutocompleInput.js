import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Tooltip } from 'reactstrap';
import classNames from 'classnames';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { LABEL } from '../components/styled-components/Typography';
import {formatObjectValue} from "./valueFormatters";

const theme = {
  input: 'form-control',
  suggestionsContainerOpen: 'suggestions-container-open',
  suggestionsList: 'suggestions-list',
  suggestion: 'suggestion',
};

export default class AutocompleteReactstrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue ? props.getSuggestionValue(props.initialValue) : '',
      suggestions: [],
      suggestionSelected: false,
      isCleared: false,
    }
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    if (!value) return [];
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      if (typeof this.props.onSuggestionsChange === 'function') {
        this.props.onSuggestionsChange(-1, this.props.type);
      }
      return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');
    const suggestions = this.props.data.filter(person => regex.test(this.props.getSuggestionValue(person)));
    if (typeof this.props.onSuggestionsChange === 'function') {
      this.props.onSuggestionsChange(suggestions.length, this.props.type);
    }
    return suggestions;
  }


  renderSuggestion =  (suggestion, { query }) => {
    const suggestionText = this.props.getSuggestionValue(suggestion);
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);
    return (
      <span className={'suggestion-content'}>
        <span>
          <span className="suggestion-status">
           {suggestion.status === 'VERIFIED' && <img src="/img/icons/ico-check.svg" height="20"/>}
            {suggestion.status === 'PENDING' && <img src="/img/icons/ico-checking.png" height="20"/>}
          </span>
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;

              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }

        </span>
      </span>
    );
  };

  onChange = (event, { newValue, method }) => {
    if (typeof event.target.value === 'string') {
      this.props.input.onChange(event);
    }
    this.setState({
      suggestionSelected: false,
      isCleared: false,
      value: newValue,
    });
  };


  onBlur = () => {
    this.props.input.onBlur();

    const {
      toggleVisibleNewDebtorField,
      input: {value=null}
    } = this.props;

    if (toggleVisibleNewDebtorField && !this.state.suggestionSelected) {
      toggleVisibleNewDebtorField(!!value);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionSelected = (e, {suggestion}) => {
    this.props.onSuggestionSelected(suggestion, this.props.type);
    this.setState({
      suggestionSelected: true
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidUpdate() {
    const {value} = this.props.input;

    if(!value && !this.state.isCleared){
      this.setState({
        value: '',
        isCleared: true,
      });
    }
  }

  render() {
    const {
      label,
      type,
      className,
      passwordSuccess,
      tooltipContent,
      input,
      meta: { touched, error, submitFailed, dirty },
      getSuggestionValue,
      disabled
    } = this.props;

    const valid = !(touched && error);

    const classes = classNames({
      success: valid,
      danger: error
    });
    const { value, suggestions, suggestionSelected } = this.state;

    const inputProps = {
      value: (value || input.value),
      onChange: this.onChange,
      onBlur: this.onBlur,
      disabled: disabled
    };

    return (
      <div>
        <FormGroup color={classes} className={className}>
          <LABEL>
            {label}
            {tooltipContent && <div style={{float: 'right', marginTop: '-5px', marginBottom: '-7px'}}>
              <span id="escrowTooltip">
                <QuestionMarkIcon />
              </span>
              <Tooltip
                className="tooltip-custom"
                placement="top-start"
                target="escrowTooltip"
                isOpen={this.state.showTooltip}
                toggle={this.toggleTooltip}
                autohide={false}
              >
                {tooltipContent}
              </Tooltip>
            </div> }
          </LABEL>

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestion={this.renderSuggestion}
            theme={theme}         // can validate border color if needed
            inputProps={inputProps}
            highlightFirstSuggestion={true}
          />
          {!valid && <FormFeedback style={{display: 'block'}}>{error}</FormFeedback>}
          {passwordSuccess && dirty && submitFailed && <p style={{color: '#7ac996', marginTop: '0.25rem'}}>{passwordSuccess}</p>}
        </FormGroup>
        {touched && dirty && !suggestionSelected && <p>New {type || 'debtor company'} will be added after verification. Please provide us with its country and number of registration. It’s only once.</p>}
      </div>);
  }
}

AutocompleteReactstrap.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    companyNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  })
};

export const renderAutocompleteReactstrap = props => {
  return (
    <AutocompleteReactstrap {...props} />
  )
};
