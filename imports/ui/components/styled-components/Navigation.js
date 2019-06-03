import styled from 'styled-components';
import {
  DropdownMenu,
} from 'reactstrap';

export const NotificationMenu = styled(DropdownMenu)`
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 25px 0 rgba(67, 68, 69, 0.1);
  padding: 0;
  border: none;
  border-radius: 0;
  min-width: 600px;
  margin-left: -40px;
  margin-top: 15px;
  
  .blue {
    color: ${props => props.theme.colors.blue};
  }

  .beta-alert {
    font-family: 'PT Sans', sans-serif;
    font-size: 0.875rem;
    color: white;
    background-color: ${props => props.theme.colors.blue};
    padding: 5px 15px;
  }

  .previous-toggle-container {
    display: flex;
    justify-content: flex-end;
    margin-top: -16px;
    margin-right: 10px;

    .previous-toggle-button {
      background-color: #ffffff;
      padding: 8px 16px;
      z-index: 99;
      cursor: pointer;

      &.open {
        box-shadow: 0 1px 5px 0 rgba(67, 68, 69, 0.15);
      }

      .previous-toggle {
        color: ${props => props.theme.colors.blue};
        text-transform: uppercase;
      }
    }
  }

  .notification-list-collapse {
    overflow: hidden;
    margin-top: -16px;
    padding: 16px 0;
    background-color: #fafbfc;
  }

  .notification-list.notification-list-previous {
    max-height: 300px;
    background-color: #fafbfc;
    margin-right: -16px;
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
      display: none;
    }
  }

  .notification-item {
    padding: 10px 20px;
    position: relative;
    flex-shrink: 0;

    .line {
      display: flex;
      flex-direction: column;
      align-items: center;

      .circle {
        width: 10px;
        height: 10px;
        object-fit: contain;
        border-radius: 5px;
        border: solid 2px ${props => props.theme.colors.paleGrey};
      }

      &::before {
        content: ' ';
        width: 3px;
        background-color: ${props => props.theme.colors.paleGrey};
        height: 7px;
      }

      &::after {
        content: ' ';
        width: 3px;
        background-color: ${props => props.theme.colors.paleGrey};
        flex-grow: 1;
        margin-bottom: -20px;
      }
    }

    &:first-child {
      .line {
        &::before {
          background-color: transparent;
        }
      }
    }

    &:last-child {
      .line {
        &::after {
          background-color: transparent;
        }
      }
    }
  }
`;
