import React from 'react';
import styled from 'styled-components';
import {Input as InputReactstrap} from 'reactstrap';
import {InputGroupAddon as InputGroupAddonReactstrap} from 'reactstrap';
/**
 * Wraps Reactstrap's input
 */
export const Input = styled(InputReactstrap)`
	border-radius: 1px;
	text-align: ${props => props.center ? 'center' : undefined};
	
	&[disabled]{
	  background: white;
	  color: ${props => props.theme.newColors.gray};
	}
  `;

  export const InputGroupAddon = styled(InputGroupAddonReactstrap)`
  border-left: 0;
  border-top: 0;
  border-right: 1px solid #ced4da !important;
`;

export const InputInvisible = styled(InputReactstrap)`
padding: ${props => props.withPadding ? false : 0};
border: none;
color: #434445;
font-size: 19px;
&, &:disabled{
background: none;
}

&, &:focus, &:active{
  box-shadow: none;
}
`;

export const RangeInput = styled(InputReactstrap).attrs({
  type: 'range',
  id: props => props.id,
  max: props => props.max,
  min: props => props.min,
  name: props => props.name,
  onChange: props => props.onChange,
  step: props => props.step,
  value: props => props.value
})`
  height: 32px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  border: none; //remove's bootstrap's FormControl border
  
  &:focus {
    outline: none;
    border: none; //remove's bootstrap's FormControl bluey border
    box-shadow: none; //remove's bootstrap's FormControl bluey shadow
  }
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #FAFAFA;
    border-radius: 25px;
    border: 1px solid #c7c7c7;
  }
  
  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #828282;
    border: 1px solid #c7c7c7;
    height: 24px;
    width: 35px;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  
  &:focus::-webkit-slider-runnable-track {
    background: #FAFAFA;
  }
  
  &::-moz-range-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #FAFAFA;
    border-radius: 25px;
    border: 1px solid #c7c7c7;
  }
  
  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #828282;
    border: 1px solid #c7c7c7;
    height: 24px;
    width: 35px;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
  }
  
  &::-ms-track {
    width: 100%;
    height: 16px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  
  &::-ms-fill-lower {
    background: #FAFAFA;
    border: 1px solid #c7c7c7;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000;
  }
  
  &::-ms-fill-upper {
    background: #FAFAFA;
    border: 1px solid #c7c7c7;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000;
  }
  
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #828282;
    border: 1px solid #c7c7c7;
    height: 24px;
    width: 35px;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
  }
  
  &:focus::-ms-fill-lower {
    background: #FAFAFA;
  }
  
  &:focus::-ms-fill-upper {
    background: #FAFAFA;
  }
`;

//TODO: For select input need to reset appearance for prevent border radius on macs

export const StyledInput= styled(InputReactstrap)`
  border-width: 0;
  border-radius: 0;
  border-color: #E1E5EB;
  border-bottom-width: 2px;

  &, &:focus, &:active{
    box-shadow: none;
  }
`;
