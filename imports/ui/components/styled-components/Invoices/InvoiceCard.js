import styled from 'styled-components';
import { invoiceStatuses } from 'meteor/populous:constants';

export const MainText = styled.div`
  font-size: 19px;
  color: ${props => props.isExpired ? props.theme.colors.red : props.theme.colors.charcoalGrey};
  margin-right: ${(props) => (props.withMargin ? '25px': 0)};
  @media (max-width: 991px){
    font-size: 16px;
  }
  @media (max-width: 768px){
    display: block;
    margin-right: 0;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const Status = styled.span`
  margin-right: 25px;
  padding: 10px 20px 12px;
  border-radius: 1px;
  border: solid 2px #f5f7fa;
  font-weight: bold;
  line-height: 0.75;
  letter-spacing: 0.8px;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  color: ${(props) => {
    switch (props.status) {
      case invoiceStatuses.auctionOpen:
        return props.theme.colors.green;
      case invoiceStatuses.auctionFailed:
        return props.theme.colors.slateGrey;
      case invoiceStatuses.awaitingContract:
        return props.theme.colors.darkBlue;
      case invoiceStatuses.auctionPending:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentPending:
        return props.theme.colors.blue;
      case invoiceStatuses.auctionClosed:
        return props.theme.colors.red;
      case invoiceStatuses.auctionRejected:
        return props.theme.colors.red;
      case invoiceStatuses.repaymentPaid:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentLate:
        return props.theme.colors.slateGrey;
      default:
        return props.theme.colors.slateGrey;
    }
  }};
  @media (max-width: 991px) {
    padding: 7px 14px;
    font-size: 14px;
    letter-spacing: 0.7px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    margin-right: 0;
  }
  @media (min-width: 1200px) {
    margin-left: 20px;
  }
`;

export const ListViewStatus = styled.span`
  margin-right: 20px;
  padding: 8px 16px;
  border-radius: 1px;
  border: solid 2px #f5f7fa;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.8px;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  color: ${(props) => {
    switch (props.status) {
      case invoiceStatuses.auctionOpen:
        return props.theme.colors.green;
      case invoiceStatuses.auctionFailed:
        return props.theme.colors.slateGrey;
      case invoiceStatuses.awaitingContract:
        return props.theme.colors.darkBlue;
      case invoiceStatuses.auctionPending:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentPending:
        return props.theme.colors.blue;
      case invoiceStatuses.auctionClosed:
        return props.theme.colors.red;
      case invoiceStatuses.auctionRejected:
        return props.theme.colors.red;
      case invoiceStatuses.repaymentPaid:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentLate:
        return props.theme.colors.slateGrey;
      default:
        return props.theme.colors.slateGrey;
    }
  }};
  @media (max-width: 991px) {
    padding: 7px 14px;
    font-size: 14px;
    letter-spacing: 0.7px;
  }
  @media (max-width: 768px){
    display: ${(props) => (props.mobile ? 'block': 'none')};
    margin-right: 0;
    font-size: 12px;
  }
`;

export const ListViewStatusSmall = styled(ListViewStatus)`
  font-size: 11px;
  padding: 6px;
`;

export const ListViewWithdrawStatusSmall = styled(ListViewStatus)`
  font-size: 13px;
  padding: 6px;
  margin-right: 0px;
  color: ${props => props.theme.colors.green};
`;

export const SubText= styled.span`
  display: inline-block;
  font-size: 14px;
  color: #636466;
  margin-right: ${(props) => (props.withMargin ? '20px': 0)};
  @media (max-width: 768px){
    float: ${(props) => (props.mobile ? 'right': 'none')};
  }
`;

export const TableHead = styled.div`
  color: ${props => props.isExpired ? props.theme.colors.red : props.theme.colors.slateGrey};
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  @media (max-width: 768px){
    text-align: ${(props) => (props.mobileRight ? 'right': 'left')};;
  }
`;

export const CardInfo = styled.div`
  @media (max-width: 768px){
    margin: 10px 0;
    background: #FAFBFC;
    margin-left: -15px;
    margin-right: -15px;
    padding: 10px 15px ;
  }
`
export const ListViewCardInfo = styled.div`
  @media (max-width: 991px){
    margin: 10px 0;
    background: #FAFBFC;
    margin-left: -15px;
    margin-right: -15px;
    padding: 7px 15px ;
  }
`;

export const CardRightCorner = styled.div`
  display: none;
  flex: 0;

  @media (max-width: 991px){
    display: ${(props) => (props.tablet ? 'inline-block': 'none')};
    right: 15px;
  }
  @media (max-width: 768px){
    display: ${(props) => (props.mobile ? 'inline-block': 'none')};
  }
`;
