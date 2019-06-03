import React from 'react';
import styled from 'styled-components';
import { Row, Col  } from 'reactstrap';

import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';

const FilterSwitchColumnsStyled = styled.div`
  position: relative;

  & > button {
    background-color: #fff;
    cursor: pointer;
    border: none;
  }

  & > div {
    position: absolute;
    right: 0;
    z-index: 1;
    padding: 10px 0;
    margin: 0;
    border-radius: 1;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 20px 0 rgba(67, 68, 69, 0.15);
    width: 185px;
    text-align: left;
  }
`;

class FilterSwitchColumns extends React.Component {
  constructor(props) {
    super(props);

    let columns = [
      { key:'seller', title: 'Seller', active: true },
      { key:'currency', title: 'Currency', active: true },
      { key:'amount', title: 'Amount', active: true },
      { key:'salePrice', title: 'Sale price', active: true },
      { key:'returnPercent', title: 'Return', active: true },
      { key:'dueDate', title: 'Due date', active: true },
      { key:'creationDate', title: 'Uploaded date', active: true },
    ];

    if (this.props.isInvestor) {
      columns.unshift({ key:'borrowerCompanyName', title: 'Borrower Company Name', active: true });
    }

    this.state = {
      showSwitchColumns: false,
      columns,
    };

    this.onColumnsChange = this.onColumnsChange.bind(this);
    this.onShowSwitchColumns = this.onShowSwitchColumns.bind(this);
  }

  onColumnsChange(column) {
    let columns = this.state.columns;
    columns.forEach((item, index) => {
      if(item.key === column) {
        columns[index].active = !columns[index].active;
      }
    });

    this.setState({
      columns: columns
    });

    this.props.changeActiveColumn(column);
  }

  onShowSwitchColumns() {
    this.setState({
      showSwitchColumns: !this.state.showSwitchColumns
    });
  }


  render() {
    const {showSwitchColumns, columns} = this.state;

    return (
      <FilterSwitchColumnsStyled>
        <button onClick={this.onShowSwitchColumns}>
          <img src="/img/icons/ico-columns.png" />
        </button>

        {showSwitchColumns &&
          <Row>
            { columns.map((column, index) =>
              <Col key={index}>
                <CustomCheckbox label={column.title} name={column.title}
                                onChange={(event) => this.onColumnsChange(column.key)}
                                value={column.key} checked={column.active} />
              </Col>
            )}
          </Row>
        }
      </FilterSwitchColumnsStyled>
    );
  }
}

export default FilterSwitchColumns;
