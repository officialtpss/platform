import styled from 'styled-components'
import {renderDocumentsRadio} from "../../../form-helpers/renderDocumentsRadio";

export const DocumentsRadio = styled(renderDocumentsRadio)`
 input {
    display: none;
  }

  .custom-document-radio{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border: solid 2px #e1e5eb;
    border-radius: 14px;
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    background: #fff;
   
    &:after{
      content: '';
      width: 16px;
      height: 16px;
      border: solid 2px ${(props) => props.theme.colors.white};
      border-radius: 8px;
      display: none;
    }
  }

  input:checked + label .custom-document-radio{
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary};
    box-shadow: 0 1px 8px 0 rgba(67, 68, 69, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    &:after{
      display: block;
    }
  }

  .form-check-label {
    display: flex;
    margin-bottom: 10px;
    font-size: 16px;
    color: #434445;
    text-transform: inherit;
    &:hover{
      cursor: pointer;
    }
  }
`;