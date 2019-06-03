import React from 'react';
import PropTypes from 'prop-types';
import { countries } from 'meteor/populous:constants';
import { FormGroup, Label, FormText, FormFeedback, InputGroup, Tooltip } from 'reactstrap';
import classNames from 'classnames';

import { Input, InputGroupAddon } from '../components/styled-components/Inputs';
import { LABEL } from '../components/styled-components/Typography';
import ShowHideIcon from '../components/Icons/ShowHide';
import QuestionMarkIcon from '../components/Icons/QuestionMark';

export default class InputReactstrap extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.state = {
      showTooltip: false
    }
  }

  toggleTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip});
  }

  render() {
    const {
      required,
      input,
      label,
      placeholder,
      errorHint,
      helperText,
      type,
      style,
      className,
      linkText,
      goalSalePrice,
      passwordSuccess,
      showHide,
      onShowHideClick,
      title,
      tooltipContent,
      tooltipStyle,
      tooltiPplacement,
      children,
      meta: { touched, error, submitFailed, dirty }
    } = this.props;
    const valid = !(touched && error);

    // https://www.npmjs.com/package/classnames
    const classes = classNames({
      success: valid,
      danger: error
    });

    return (
      <div className={showHide && 'login-password-field'}>
        {valid
        // If valid, don't have the valid prop on <Input/>, we don't want green borders
        ? <FormGroup color={classes} className={className}>
            <LABEL>
              {label}
              {tooltipContent && <div style={tooltipStyle ? tooltipStyle : {float: 'right', marginTop: '-5px', marginBottom: '-7px'}}>
                <span id="escrowTooltip">
                  <QuestionMarkIcon />
                </span>
                <Tooltip
                  className="tooltip-custom"
                  placement={tooltiPplacement ?  tooltiPplacement : "top-start"}
                  target="escrowTooltip"
                  isOpen={this.state.showTooltip}
                  toggle={this.toggleTooltip}
                  autohide={false}
                >
                  {tooltipContent}
                </Tooltip>
              </div> }
            </LABEL>
            {goalSalePrice ?
                <InputGroup>
                  <InputGroupAddon style={{backgroundColor: 'transparent'}}>GBPp</InputGroupAddon>
                  <Input
                    type={type}
                    title={title} 
                    placeholder={placeholder}
                    onChange={input.onChange}
                    disabled={this.props.disabled || false}
                    style={style}
                    {...input}
                  >
                    {children}
                  </Input>
                </InputGroup>
            :  <Input
                  className={className}
                  required={required}
                  type={type}
                  title={title}
                  style={style}
                  placeholder={placeholder}
                  onChange={input.onChange}
                  disabled={this.props.disabled || false}
                  {...input}
                >
                  {children}
                </Input>
            }
            {helperText &&
              <FormText color="muted">
                {helperText}<a href="/"> {linkText}</a>
              </FormText>}
            {touched && error && <FormFeedback>{error}</FormFeedback>}
            {passwordSuccess && dirty && submitFailed && <p style={{color: '#7ac996', marginTop: '0.25rem'}}>{passwordSuccess}</p>}
          </FormGroup>
          // If not valid, add the valid prop
          : <FormGroup color={classes} className={className}>
              <LABEL>
                {label}
                {tooltipContent && <div style={tooltipStyle ? tooltipStyle : {float: 'right', marginTop: '-5px', marginBottom: '-7px'}}>
                  <span id="escrowTooltip">
                    <QuestionMarkIcon />
                  </span>
                  <Tooltip
                    className="tooltip-custom"
                    placement={tooltiPplacement ?  tooltiPplacement : "top-start"}
                    target="escrowTooltip"
                    isOpen={this.state.showTooltip}
                    toggle={this.toggleTooltip}
                    autohide={false}
                  >
                    {tooltipContent}
                  </Tooltip>
                </div> }
              </LABEL>
              {goalSalePrice ?
                  <InputGroup>
                    <InputGroupAddon style={{backgroundColor: 'transparent'}}>GBPp</InputGroupAddon>
                    <Input
                      type={type}
                      title={title} 
                      valid={valid}
                      style={style}
                      placeholder={placeholder}
                      onChange={input.onChange}
                      disabled={this.props.disabled || false}
                      {...input}
                    >
                      {children}
                    </Input>
                  </InputGroup>
              :  <Input
                    type={type}
                    title={title}
                    style={style}
                    valid={valid}
                    placeholder={placeholder}
                    onChange={input.onChange}
                    disabled={this.props.disabled || false}
                    {...input}
                  >
                    {children}
                  </Input>
              }
              {helperText &&
                <FormText color="muted">
                  {helperText}<a href="/"> {linkText}</a>
                </FormText>}
              {touched && error && <FormFeedback>{error}
                {errorHint && error === 'Too weak' &&
                  <span className="question-mark">
                    <img src="/img/icons/ico-question.svg" height="20"/>
                    <p className="tooltip-error">Password must be at least 8 characters long and have at least one capital letter, one digit, and one special character</p>
                  </span>
                }
              </FormFeedback>}
            </FormGroup>
          }
          {showHide && input.value.length > 0 && <span className="password-show" onClick={onShowHideClick}>
            <ShowHideIcon color={type === 'password' ? '#A5ACB5' : '#636466'}/>
          </span>}
      </div>
    );
  }
}

InputReactstrap.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  })
};

export const renderInputReactstrap = props => {
  return (
    <InputReactstrap {...props} />
  )
};
