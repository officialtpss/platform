import styled from 'styled-components'
import CustomRadioComponent from "../../../form-helpers/customRadio";


const CustomRadio = styled(CustomRadioComponent)`
  input{
    display: none;
  }
  
  .custom-radio{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 50%;
    border: solid 2px #e1e5eb;
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    background: #fff;
   
    &:after{
      display: none;
      content: ' ';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: solid 2px #fff;
      background: ${(props) => props.theme.colors.primary};
    }
  }

  input:checked + label .custom-radio{
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary};
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    	
    &:after{
      display: block;
    }
  }

  label{
    display: flex;
    
    margin: 0;
    font-size: 16px;
    color: #434445;
    
    &:hover{
      cursor: pointer;
    }
  }
`;

export default CustomRadio;