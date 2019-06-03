import React from 'react';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import DateRangePickerWrapper from '../../../components/DatePicker/DateRangePickerWrapper';
import { UnderLineDiv } from '../../../components/styled-components/Divs';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { LABEL } from '../../../components/styled-components/Typography';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';
import { countries } from 'meteor/populous:constants';

const MoreOptions =({
  className,
  filters,
  onCreationDateChange,
  onReset,resetToInital,
  renderInvoiceStatuses,
  onCountryChange,
  onTextFilterChange,
  onTradePlaceChange,
  onAddedByMeChange
}) => {

  return (
    <div className={`${className} more-option`}>
      <div className="container">
        <Row>
          <Col xs="12" sm="6" md="3">
            <LABEL className='m-b-15'>Invoice Creation Dates</LABEL>
            <UnderLineDiv>
              <DateRangePickerWrapper
                inner={{noBorder: true,}}
                startDate={filters.creationDate.startDate ? moment(filters.creationDate.startDate) : filters.creationDate.startDate}
                endDate={filters.creationDate.endDate ? moment(filters.creationDate.endDate) : filters.creationDate.endDate}
                onChange={(dates) => onCreationDateChange(dates)}
              />
            </UnderLineDiv>

            {false && <div className={'m-t-15'}>
              <LABEL className='m-b-15'>Trade place</LABEL>
              <CustomCheckbox label={'Populous world'} name={'populousWorldPlace'}
                onChange={onTradePlaceChange}
                checked={filters.tradeOnPopulousWorld}
              />
              <CustomCheckbox label={'Other'} name={'otherPlace'}
                onChange={onTradePlaceChange}
                checked={!filters.tradeOnPopulousWorld}
              />

              <CustomCheckbox label={'Added by me'} name={'addedByMe'}
                className='m-t-30'
                onChange={onAddedByMeChange}
                checked={filters.addedByMe}
              />
            </div>}

          </Col>
          <Col xs="12" sm="6" md="6">
            <Row className='m-b-30'>
              <Col xs="12" sm="12" md="12" className='m-b-15'>
                <LABEL className='m-b-15'>Invoice Seller Company No.</LABEL>
                <StyledInput
                  name='sellerCompanyNumber'
                  value={filters.sellerCompanyNumber ? filters.sellerCompanyNumber : ''}
                  onChange={(e)=>{onTextFilterChange('sellerCompanyNumber', e.target.value)}}
                />
              </Col>
              <Col xs="6" sm="6" md="6">
                <LABEL className='m-b-15'>Invoice Number</LABEL>
                <StyledInput
                  name='invoiceNumber'
                  value={filters.invoiceNumber ? filters.invoiceNumber : ''}
                  onChange={(e)=>{onTextFilterChange('invoiceNumber', e.target.value)}}
                />
              </Col>
              <Col xs="6" sm="6" md="6">
                <LABEL className='m-b-15'>Country</LABEL>
                <StyledInput
                  type="select"
                  id='countryFilter'
                  name='countryFilter'
                  value={filters.country ? filters.country : ''}
                  onChange={(e)=>{onCountryChange(e.target.value)}}
                >
                  <option key={'qwerty'} value='all'>All</option>
                  {
                    countries.map(c => (
                      <option key={c.key} value={c.key}>
                        { c.name }
                      </option>
                    ))
                  }
                </StyledInput>
              </Col>
            </Row>

            {renderInvoiceStatuses()}

          </Col>

          <Col xs="12" sm="6" md="3" className='p-t-30'>
            <PrimaryButton md onClick={()=>{onReset(); resetToInital();}} className="m-t-60">RESET TO DEFAULT</PrimaryButton>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default styled(MoreOptions)`
  input, select, .DateRangePickerInput{
    background: #F5F7FA;
  }
  
  & .status-filters{
   .status-block-item{
     padding: 0;
   } 
  }
`;
