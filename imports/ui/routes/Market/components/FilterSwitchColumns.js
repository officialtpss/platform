import React from 'react';
import { Row, Col  } from 'reactstrap';

import { CustomCheckbox } from '../../../components/styled-components/Forms/CustomCheckbox';

const styleButton = {
  backgroundColor: '#fff', cursor: 'pointer', border: 'none'
};
const styleWrapperCheckbox = {
  position: 'absolute', right: 25, zIndex: 1, padding: '10px 0',
  borderRadius: 1, backgroundColor: '#ffffff',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 20px 0 rgba(67, 68, 69, 0.15)',
  width: 185, textAlign: 'left'
};

class FilterSwitchColumns  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSwitchColumns: false,
      columns: [
        {key:'borrowerCompanyName', title: 'Borrower Company Name', active: true},
        {key:'seller', title: 'Seller', active: true},
        {key:'currency', title: 'Currency', active: true},
        {key:'amount', title: 'Amount', active: true},
        {key:'salePrice', title: 'Sale price', active: true},
        {key:'returnPercent', title: 'Return', active: true},
        {key:'dueDate', title: 'Due date', active: true},
        {key:'creationDate', title: 'Uploaded date', active: true},
      ]
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
      <div className="m-t-5">
        <button
          style={styleButton}
          onClick={this.onShowSwitchColumns}
        >
          <img src="/img/icons/ico-columns.png" />
        </button>

        {showSwitchColumns &&
          <Row style={styleWrapperCheckbox}>
            { columns.map((column, index) =>
              <Col key={index}>
                <CustomCheckbox label={column.title} name={column.title}
                                onChange={(event) => this.onColumnsChange(column.key)}
                                value={column.key} checked={column.active} />
              </Col>
            )}
          </Row>
        }
      </div>
    );
  }
}

export default FilterSwitchColumns;
