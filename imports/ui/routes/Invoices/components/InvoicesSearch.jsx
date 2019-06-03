import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import { StyledInput} from '../../../components/styled-components/Inputs';
import { invoicesSort } from '../modules/constants';
import FilterSwitchColumns from './FilterSwitchColumns';

const InvoicesSearch = ({
  filters,
  updateQuickFilters,
  changeActiveColumn,
  currentUser,
}) => {

  const updateKeyword = (keyword) => {
    let quickFilters = { ...filters };
    quickFilters.keyword = keyword;
    updateQuickFilters(quickFilters);
  };

  const updateSortBy = (sortBy) => {
    let quickFilters = { ...filters };
    quickFilters.sortBy = sortBy;
    updateQuickFilters(quickFilters);
  };

  updateSortOrder = (sortOrder) => {
    let newFilters = {...filters, sortOrder: sortOrder};
    updateQuickFilters(newFilters);
  }

  const renderSortBy = () => {
    const options = [];

    for (const value in invoicesSort) {
      options.push(<option value={value} key={value}>{invoicesSort[value].label}</option>)
    }

    return (
      <StyledInput id="invoice-sort-select" type="select" name="sort-by" value={filters.sortBy} onChange={(event) => {updateSortBy(event.nativeEvent.target.value)}}>
        {options}
      </StyledInput>
    );
  };

  return (
    <Row className="m-b-10">
      <Col md={'4'} sm="5" xs={'12'} className="m-b-10">
        <StyledInput style={{color: '#C0C5CC', fontSize: '16px'}} placeholder="Search..."
                    onChange={(event) => {
                      const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                      updateKeyword(data)
                    }}
        />
      </Col>
      <Col md={{size: 4, offset: 3}} sm={{size: 5, offset: 0}} xs={{size: 9, offset: 0}}>
        <FormGroup className="d-flex">
          <Label  for="invoice-sort-select" style={{marginTop: 'auto'}}>
            Sort By
          </Label>
          <Col className="p-r-0">
            { renderSortBy() }
            <span className="sort-icon-span" onClick={(event)=> {updateSortOrder(!invoicesSort[filters.sortBy].desc)}}>
              { invoicesSort[filters.sortBy].desc && <img src="/img/icons/ico-sort-za.png" /> }
              { !invoicesSort[filters.sortBy].desc && <img src="/img/icons/ico-sort-az.png" /> }
            </span>
          </Col>
        </FormGroup>
      </Col>
      <Col md="1" sm="2" xs="3" className="text-right">
        <FilterSwitchColumns changeActiveColumn={changeActiveColumn} isInvestor={currentUser.isInvestor()} />
      </Col>
    </Row>
  );
};

export default InvoicesSearch;
