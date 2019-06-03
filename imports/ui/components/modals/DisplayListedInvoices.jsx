import React from 'react';
import moment from 'moment';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom'

import { floor } from '../../utils/formatter';
import { Small, LinkText } from '../styled-components/Typography';

class DisplayListedInvoices extends React.Component {
  constructor(props) {
    super(props);
  }

  getInvoicesLists() {
    const {invoicesList} = this.props;
    const borderRight = {
      borderRight: '2px solid #E1EBE5'
    };

    return invoicesList.map((invoice, index) => (
      <Row key={index}>
        <Col className={'border-row' + (index === invoicesList.length - 1 ? '' : ' bottomless')}>
          <Row>
            <Col xs={3} style={borderRight} className="p-15">
              {invoice._id}
            </Col>
            <Col xs={4} style={borderRight} className="p-15">
              {invoice.debtorName}
            </Col>
            <Col xs={2} style={borderRight} className="p-15 text-right">
              {floor(invoice.amount)}
            </Col>
            <Col xs={2} style={borderRight} className="p-15 text-center">
              {moment(invoice.dueDate).format('DD-MM-YYYY')}
            </Col>
            <Col xs={1} className="p-15 text-center">
              <LinkText className="text-uppercase"><Link to={"/invoice/"+invoice._id}>View</Link></LinkText>
            </Col>
          </Row>
        </Col>
      </Row>
    ))
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}
             className={'custom modal-lg ' + this.props.className}>
        <ModalHeader toggle={this.props.toggle}>Invoices with coming payment due</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs={3}><Small className="m-t-10 m-b-5">Invoice No</Small></Col>
            <Col xs={4}><Small className="m-t-10 m-b-5">Debtor</Small></Col>
            <Col xs={2}><Small className="m-t-10 m-b-5 text-right">Amount</Small></Col>
            <Col xs={3}><Small className="m-t-10 m-b-5 p-l-30">Due date</Small></Col>
          </Row>

          {this.getInvoicesLists()}

        </ModalBody>
      </Modal>
    )
  }
}

export default DisplayListedInvoices;
