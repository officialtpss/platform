import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse, FormGroup, Tooltip } from 'reactstrap';
import InputRange from 'react-input-range';
import { invoiceStatuses, returnPercentage, fixtures, statuses } from 'meteor/populous:constants';
import { SingleDatePicker } from 'react-dates';
import classnames from 'classnames';
import moment from 'moment';

import 'react-select/dist/react-select.css';
import '../../../libs/react-input-slider/index.css';
import '../../../libs/styles/bootstrap-multiselect.css';

import DateRangePickerWrapper from '../../../components/DatePicker/DateRangePickerWrapper';
import { InputInvisible } from '../../../components/styled-components/Inputs';
import { PrimaryButton, LinkButton } from '../../../components/styled-components/Buttons';
import { Switch } from '../../../components/styled-components/Invoices/Invoice';
import { UnderLineDiv } from '../../../components/styled-components/Divs';
import { LABEL, P } from '../../../components/styled-components/Typography';
import CurrencyFilter from '../../../form-helpers/currencyFilter';
import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';
import { buyerInvoiceStatues } from '../modules/constants';
import MoreOptions from './MoreOptions';

const moreButtonStyle = {
  padding: '8px 16px',
  letterSpacing: '0.5px',
  fontSize: '12px',
  marginLeft: '-16px'
};

const CURRENCY_FILTER_REF = 'CURRENCY_FILTER_REF';

const InvoicesSearch = ({
  currencies, filters, onSearch, onReset, baseCurrency,
  toggleFilters, onUpdateFilters, previewMode, togglePreviewMode,
  previewModeTooltip, togglePreviewModeTooltip, currentUser, moreOption, toggleMoreOption
}) => {

  const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
  const isNewUser = currentUser && !currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress());

  const searchInvoice = (isAll) => {
    if (isAll) {
      this[CURRENCY_FILTER_REF].resetToInital();
      let _filters = {
        currencies: null,
        salePrice: { min: filters.salePriceLimit.min, max: filters.salePriceLimit.max },
        dueDate: { startDate: null, endDate: null },
        returnPercentage: 'all',
        creationDate: { startDate: null, endDate: null },
        salePriceLimit: filters.salePriceLimit,
        sellerCompanyNumber: null,
        invoiceNumber:  null,
        country: 'all',
        statuses: {
          auctionPending: true,
          auctionOpen: true,
          repaymentPaid: true,
          auctionClosed: true,
          repaymentPending: true,
          auctionRejected: true,
          defaulted: true,
        },
        tradeOnPopulousWorld: true,
        addedByMe: false,
        sortColumn: 'updatedAtDesc',
        sortOrder: true,
      };
      onUpdateFilters(_filters);
      onSearch(_filters);
    } else {
      onSearch(filters);
    }
    toggleFilters();
  };

  const renderCurrency = () => {
    return (
      <FormGroup>
        <LABEL for="currency">Currency</LABEL>
        <div className="m-b-10">
          <CurrencyFilter currencies={currencies}
                          defautCheckedCurrency={filters.currencies}
                          onChange={onCurrencyChange}
                          baseCurrency={baseCurrency}
                          displayBaseCurrency={false}
                          innerRef={component => this[CURRENCY_FILTER_REF] = component}
          />
        </div>
      </FormGroup>
    )
  };

  const onCurrencyChange = selectedValues => {
    onUpdateFilters({
      currencies: selectedValues
    });
  };

  const renderSalePriceRange = () => {
    const {salePrice, salePriceLimit} = filters;
    return (
      <FormGroup>
        <LABEL>Sale Price Range</LABEL>
        <UnderLineDiv className="d-flex justify-content-between align-items-center underline-block m-b-10">
          <InputInvisible value={salePrice.min} className="width-40" disabled />
          <span style={{
            display: 'block',
            minHeight: '2px',
            minWidth: '12px',
            background: '#A5ACB5',
          }}/>
          <InputInvisible value={salePrice.max} className="text-right width-40" disabled/>
        </UnderLineDiv>
        <InputRange
          draggableTrack
          maxValue={salePriceLimit.max === salePriceLimit.min ? ++salePriceLimit.max : salePriceLimit.max}
          minValue={salePriceLimit.min}
          formatLabel={parseInt}
          value={salePrice.max === -1 ? {min: 0, max: 1} : salePrice}
          onChange={salePriceChange}
        />
      </FormGroup>);
  };

  const salePriceChange = (value) => {
    const {salePriceLimit} = filters;
    if(value.min < salePriceLimit.min){
      value.min = salePriceLimit.min;
    }

    if(value.max > salePriceLimit.max){
      value.max = salePriceLimit.max;
    }

    if(value.max < value.min){
      value.max = value.min;
    }

    onUpdateFilters({
      salePrice: value
    });
  };

  const renderDueDates = () => {
    return (<FormGroup>
      <LABEL>Due Dates</LABEL>
      <UnderLineDiv>
        <DateRangePickerWrapper
          startDate={filters.dueDate.startDate ? moment(filters.dueDate.startDate) : filters.dueDate.startDate}
          endDate={filters.dueDate.endDate ? moment(filters.dueDate.endDate) : filters.dueDate.endDate}
          onChange={(dates) => dueDatesChange(dates)}
          />
      </UnderLineDiv>
    </FormGroup>)
  };

  const dueDatesChange = (dates) => {
    if (dates && dates.startDate) {
      dates.startDate = dates.startDate.toDate();
    }
    if (dates && dates.endDate) {
      dates.endDate = dates.endDate.toDate();
    }

    onUpdateFilters({
      dueDate: dates
    });
  };

  const renderPercentage = () => {
    return (<FormGroup>
      <LABEL>Discount Not Less Than</LABEL>
      <UnderLineDiv>
        <InputInvisible type="select" value={filters.returnPercentage} name="return" id="return" onChange={(event) => percentChange(event)}>
          <option value='all'>Any</option>
          <option value='pending'>Pending</option>
          {
            returnPercentage.map(
            (percent) => (<option value={percent} key={percent}>{percent}%</option>))
          }
        </InputInvisible>
      </UnderLineDiv>
    </FormGroup>);
  };

  const percentChange = event => {
    onUpdateFilters({
      returnPercentage: event.nativeEvent.target.value
    });
  };

  const onCreationDateChange = dates => {
    if (dates && dates.startDate) {
      dates.startDate = dates.startDate.toDate();
    }
    if (dates && dates.endDate) {
      dates.endDate = dates.endDate.toDate();
    }

    onUpdateFilters({
      creationDate: dates
    });
  };

  const onCountryChange = country => {
    onUpdateFilters({
      country: country,
    });
  };

  const onTextFilterChange = (fieldName ,value) => {
    onUpdateFilters({
      [fieldName]: value,
    });
  };

  const onTradePlaceChange = () => {
    onUpdateFilters({tradeOnPopulousWorld: !filters.tradeOnPopulousWorld});
  };

  const onAddedByMeChange = () => {
    onUpdateFilters({addedByMe: !filters.addedByMe});
  };

  const renderInvoiceStatuses = () => {
    const statuses = buyerInvoiceStatues;

    return (
      <div>
        <LABEL className='m-b-20'>Invoice Status</LABEL>
        <Row className='status-filters p-l-20'>
          { Object.keys(statuses).map((status) =>
            <Col md="4" sm="6" xs="12" key={status} className={'status-block-item'}>
              <CustomCheckbox label={statuses[status]} name={status}
                onChange={(event) => onStatusChange(event, status)}
                value={status}
                checked={filters.statuses[status] || false}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  };

  const onStatusChange = (event, status) => {
    let statuses = { ...filters.statuses };
    statuses[status] = !statuses[status];
    onUpdateFilters({statuses});
  };

  const verifiedKYCS = currentUser.KYCStatus === statuses.verified;

  return (
    <div>
      {
        (!verifiedKYCS || isNewUser) &&
        <Col xs="12" md="10" xl="9">
          <div className="flex-row m-t-30 align-content-center">
            <div className="m-r-10" style={{position: 'relative', paddingRight: '30px'}}>
              <img src="/img/icons/ico-info.png" alt="Info"
                   style={{position: 'absolute', top: '50%', marginTop: '-15px'}}/>
            </div>
            <div>
              { !verifiedKYCS &&
                <P className=" m-b-0">
                  Please complete your <Link to='/upload'>Populous customer profile</Link>.
                  You will be able to buy invoices after the customer profile data is provided and verified. It should not
                  take more than 24 hours.
                </P>
              }

              { isNewUser &&
              <P className={classnames('m-b-0', {['m-t-10']: !verifiedKYCS})}>
                Please <Link to='/' onClick={() => localStorage.setItem('isNewUser', true)}>setup 2-factor
                authentication</Link> to be able to buy invoices.
              </P>
              }
            </div>
          </div>
        </Col>
      }

      <div className="m-t-20 m-b-20">Please set your search preferences so we can find suitable invoices for you.</div>

      <Row>
        <Col md="3" sm="6" xs="12">
          {renderCurrency()}
        </Col>
        <Col md="3" sm="6" xs="10">
          {renderSalePriceRange()}
        </Col>
        <Col md="3" sm="6" xs="12">
          {renderDueDates()}
        </Col>
        <Col md="3" sm="6" xs="6">
          {renderPercentage()}
        </Col>
      </Row>
      { baseCurrency &&
        <Row>
          <Col>
            <FormGroup>
              <Switch
                checked={previewMode}
                onChange={() => togglePreviewMode()}
                onColor="#E1E5EB"
                offColor="#fff"
                onHandleColor="#5CA0F6"
                offHandleColor="#A5ACB5"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 1px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={10}
                width={35}
                className="switch-checkbox m-r-10"
              />
              <P className="d-inline-block m-0">
                Preview in base currency
                <img src="/img/icons/ico-question.svg" id="previewModeTooltip" />
                <Tooltip placement="top-start" isOpen={previewModeTooltip} target="previewModeTooltip"
                         toggle={togglePreviewModeTooltip} autohide={false}>
                  If enabled, invoice funding currency will be converted into base currency (GBPp) for preview. Sale price range will be set in  the base currency.
                </Tooltip>
              </P>
            </FormGroup>
          </Col>
        </Row>
      }
      <Row>
        <Col>

        </Col>
      </Row>
      <div className="more-option-area">
        <LinkButton className={classnames({'show-more': moreOption})} onClick={toggleMoreOption} style={moreButtonStyle}>
          More Options {moreOption ? (<span>&mdash;</span>) : (<span>+</span>)}
        </LinkButton>
      </div>
      <Collapse isOpen={moreOption}>
        <MoreOptions
          filters={filters}
          onCreationDateChange={onCreationDateChange}
          onReset={onReset}
          resetToInital={()=>{this[CURRENCY_FILTER_REF].resetToInital()}}
          renderInvoiceStatuses={renderInvoiceStatuses}
          onCountryChange={onCountryChange}
          onTextFilterChange={onTextFilterChange}
          onTradePlaceChange={onTradePlaceChange}
          onAddedByMeChange={onAddedByMeChange}
        />
      </Collapse>
      <Row className="m-t-30">
        <Col className="responsive-center">
          <PrimaryButton onClick={() => {searchInvoice(false)}}>Find Invoices</PrimaryButton>
          <PrimaryButton outline className="m-l-20" onClick={() => {searchInvoice(true)}}>Show All Invoices</PrimaryButton>
        </Col>
      </Row>
    </div>
  );
};

export default InvoicesSearch;
