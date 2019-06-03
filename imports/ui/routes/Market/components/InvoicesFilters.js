import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { invoicesSort } from "../modules/constants";
import FilterSwitchColumns from './FilterSwitchColumns';

let toggleSearch = false;

const InvoicesFilters = ({updateFullTextSearch, keyword, updateSortBy, updateSortOrder, sortColumn, sortOrder, changeActiveColumn}) => {

  const getSortBy = () => {
    const options = [];

    for (const value in invoicesSort) {
      options.push(<option value={value} key={value}>{invoicesSort[value].label}</option>)
    }

    return (
      <StyledInput
        type="select"
        name="sort-by"
        value={sortColumn}
        onChange={(event) => {updateSortBy(event.nativeEvent.target.value)}}
      >
        {options}
      </StyledInput>
    );
  }

  return (
    <Row className="m-b-10">
      <Col md="4" sm="5" xs="12" className="m-b-10">
        <StyledInput
          style={{color: '#C0C5CC', fontSize: '16px', paddingRight: 35}}
          placeholder="Search..."
          onChange={(event) => {
            const data = event.nativeEvent.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            updateFullTextSearch(data)
          }}
          value={keyword}
        />
      </Col>

      <Col md={{size: 4, offset: 3}} sm={{size: 5, offset: 0}} xs={{size: 9, offset: 0}}>
        <FormGroup className="d-flex">
          <Label style={{marginTop: 'auto'}}>
            Sort By
          </Label>
          <Col>
            {getSortBy()}
            <span className="sort-icon-span" onClick={(event)=> {updateSortOrder(!sortOrder)}}>
              { sortOrder
                ? <img src="/img/icons/ico-sort-za.png" />
                : <img src="/img/icons/ico-sort-az.png" /> }
            </span>
          </Col>
        </FormGroup>
      </Col>

      <Col md="1" sm="2" xs="3" className="text-right">
        <FilterSwitchColumns changeActiveColumn={changeActiveColumn} />
      </Col>
    </Row>
  );
}

export default InvoicesFilters;
