import styled from 'styled-components'
import {CustomCheckbox as CustomCheckboxComponent} from "../../../form-helpers/renderCheckbox";

export const CustomCheckbox = styled(CustomCheckboxComponent)`
  input {
    display: none;
  }

  .custom-checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border: solid 2px #e1e5eb;
    border-radius: 1px;
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    background: #fff;
   
    &:after{
      margin-bottom: 2px;
      content: '';
      width: 8px;
      height: 16px;
      border-right: solid 3px #fff;
      border-bottom: solid 3px #fff;
      border-radius: 2px;
      transform: rotate(45deg);
      transform-origin: 50% 50%;
      display: none;
    }
  }

  input:checked + label .custom-checkbox{
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary};
    box-shadow: 0 1px 8px 0 rgba(67, 68, 69, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    &:after{
      display: block;
    }
  }

  label {
    display: flex;
    margin: 0;
    font-size: 16px;
    color: #434445;
    text-transform: inherit;
    &:hover{
      cursor: pointer;
    }
  }
`;