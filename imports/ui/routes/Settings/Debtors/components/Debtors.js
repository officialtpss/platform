import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {toastr} from 'react-redux-toastr';
import {debtorStatuses} from 'meteor/populous:constants'

import {H3, Small} from "../../../../components/styled-components/Typography/index";
import CreateDebtorModal from "./CreateDebtorModal";
import {PrimaryButton} from "../../../../components/styled-components/Buttons";
import PlusIcon from "../../../../components/Icons/PlusIcon";


const initialState = {
  isModalOpen: false,
};

class Debtors extends React.Component {
  state = {...initialState};
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    debtors: PropTypes.array.isRequired,
    isDebtorLinkedToInvoice: PropTypes.object.isRequired,
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  };

  render() {

    const {isModalOpen} = this.state;

    return (
      <Fragment>
        <H3 className={'m-b-20'}>Debtors</H3>
        <table style={{width: '100%'}}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </table>
        <PrimaryButton md type={'button'} className={'d-flex align-items-center m-t-30'} onClick={this.toggleModal}>
          <span className={'d-block m-r-10'}>
            <PlusIcon color={'#fff'}/>
          </span>
          add debtor
        </PrimaryButton>
        <CreateDebtorModal isOpen={isModalOpen} toggle={this.toggleModal}/>
      </Fragment>
    );
  }

  deleteDebtor = (debtor) => {
    debtor.callMethod('delete', (error) => {
      if (error) {
        return toastr.error('Error!', error.reason)
      }
    })
  };


  renderTableHead() {
    return (
      <thead>
      {this.renderTableRow({
        firstCol: 'Debtor Name',
        secondCol: (<Small>Verified</Small>),
        thirdCol: '',
        isBody: false
      })}
      </thead>
    );
  }

  renderTableBody() {
    const {
      debtors,
      isDebtorLinkedToInvoice,
    } = this.props;

    return (
      <tbody>
      {debtors.map((debtor, index) => {
        const {_id, name, status,} = debtor;

        let statusIcon = '';

        switch (status) {
          case debtorStatuses.verified:
            statusIcon = 'ico-check';
            break;
          case debtorStatuses.pending:
            statusIcon = 'ico-in-progress';
            break;
          case debtorStatuses.unverified:
            statusIcon = 'ico-cross';
            break;
        }

        return this.renderTableRow({

          rowClassName: 'border-row' + (index !== 0 ? ' topless' : ''),
          rowKey: _id,
          firstCol: name,
          secondCol: (<img src={'/img/icons/' + statusIcon + '.png'}/>),
          thirdCol: (!isDebtorLinkedToInvoice[_id]
              ? <img src="/img/icons/delete.png" className={'cursor-pointer'} height={22} onClick={() => this.deleteDebtor(debtor)}/>
              : ''
          ),
        });
      })}
      </tbody>
    );
  }

  renderTableRow({
                   rowKey, rowClassName = '',
                   firstCol, secondCol, thirdCol,
                 }) {
    return (
      <tr className={rowClassName} key={rowKey}>
        <td className={'p-l-20 p-r-10 p-t-5 p-b-5'}>
          <Small>
            {firstCol}
          </Small>
        </td>
        <td className={'text-center p-l-10 p-r-10 p-t-5 p-b-5'} style={{width: '20%', whiteSpace: 'nowrap'}}>
          {secondCol}
        </td>
        <td
          className={'p-l-10 p-r-10 text-center  p-t-5 p-b-5'}
          style={{width: '10%'}}
        >
          {thirdCol}
        </td>
      </tr>
    );
  }
}

export default Debtors;
