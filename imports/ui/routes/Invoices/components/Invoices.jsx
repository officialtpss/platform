import React from 'react';
import { Container, Col, Row, Collapse } from 'reactstrap';

import Spinner from '../../../components/Spinner';
import { InvoicesHeader, FilterButton } from '../../../components/styled-components/Invoices/InvoicesList';
import { H1, Lead } from '../../../components/styled-components/Typography';
import NoInvoice from '../../../components/NoInvoice/NoInvoice';
import InvoiceCard from './InvoiceCard';
import InvoicesFilters from './InvoicesFilters';
import InvoicesSearch from './InvoicesSearch';
import NoInvoices from './NoInvoices';

class Invoices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeColumns: {
        borrowerFullName: true,
        borrowerCompanyName: true,
        seller: true,
        currency: true,
        amount: true,
        salePrice: true,
        returnPercent: true,
        dueDate: true,
        creationDate: true,
      },
      filters: props.filters,
    }

    this.changeActiveColumn = this.changeActiveColumn.bind(this);
    this.setFilters = this.setFilters.bind(this);
  }

  componentWillUnmount() {
    this.props.updateFilters(this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: Maybe it is not the best practice, but as external props for component stored in state, we need to update it manually when salePriceLimit is changed
    if (
      this.state.filters.salePriceLimit.min !== nextProps.filters.salePriceLimit.min ||
      this.state.filters.salePriceLimit.max !== nextProps.filters.salePriceLimit.max
    ) {

      const { salePrice } = this.state.filters;
      const newSalePrice = {};
      if (salePrice.min < 0 || salePrice.min < nextProps.filters.salePriceLimit.min) {
        // update salePrice min
        newSalePrice.min = nextProps.filters.salePriceLimit.min;
      }

      if (salePrice.max < 0 || salePrice.max > nextProps.filters.salePriceLimit.max) {
        // update salePrice max
        newSalePrice.max = nextProps.filters.salePriceLimit.max;
      }

      const newFilters = {...JSON.parse(JSON.stringify(this.state.filters)), salePriceLimit: {
        min: nextProps.filters.salePriceLimit.min,
        max: nextProps.filters.salePriceLimit.max
      }};

      if (Object.keys(newSalePrice).length) {
        newFilters.salePrice = {...salePrice, ...newSalePrice};
      }

      if (!this.state.filters.currencies) {
        newFilters.currencies = nextProps.currencies.map(c => c.symbol);
      }

      this.setState({
        filters: newFilters
      });
    }
  }

  changeActiveColumn(param) {
    let activeColumns = this.state.activeColumns;
    activeColumns[param] = !activeColumns[param];
    this.setState({activeColumns});
  }

  setFilters(updates) {
    let newFilters = {...this.state.filters, ...updates};
    this.setState({filters: newFilters});
  }

  resetFilters = () => {
    this.setState({filters: this.props.filters});
  }

  render() {
    const {
      loading, invoices, showFilters, toggleFilters, currencies, searchInvoice,
      quickFilters, updateQuickFilters, invoicesCount, currentUser, updateFilters,
      minSalePriceInvoice, maxSalePriceInvoice
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (invoicesCount === 0) {
      return (
        <Container>
          <Row>
            <Col xs={'12'}>
              <NoInvoices currentUser={currentUser} />
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row className="page-title">
          <Col className="p-0">
            <InvoicesHeader>
              <H1 transform="uppercase">My Invoices</H1>
              <FilterButton onClick={() => toggleFilters()} primary={showFilters ? '' : 'primary'}>
                <img src={showFilters?"/img/icons/ico-filters.svg":"/img/icons/ico-filters-white.svg"} height={30}/>
                <span className="m-l-5 align-middle">Filters</span>
              </FilterButton>
            </InvoicesHeader>
          </Col>
        </Row>
        <Collapse isOpen={showFilters} className="m-t-20">
          <InvoicesFilters
            currentUser={currentUser}
            currencies={currencies}
            searchInvoice={searchInvoice}
            toggleFilters={toggleFilters}
            onSearch={(searchFilters) => updateFilters(searchFilters)}
            onReset={this.resetFilters}
            filters={this.state.filters}
            onUpdateFilters={(updates) => this.setFilters(updates)}
            minSalePriceInvoice={minSalePriceInvoice}
            maxSalePriceInvoice={maxSalePriceInvoice}
          />
        </Collapse>
        <Row>
          <Col>
            <InvoicesSearch
              filters={quickFilters}
              updateQuickFilters={updateQuickFilters}
              changeActiveColumn={this.changeActiveColumn}
              currentUser={currentUser}
            />
          </Col>
        </Row>
        <Row>
          <Col className="m-b-30">
            { invoices.length > 0 && invoices.map((invoice, index) =>
              <InvoiceCard currentUser={currentUser} invoice={invoice} key={index} page="invoices"
                           activeColumns={this.state.activeColumns} currencies={currencies} />
            )}
            { invoices.length == 0 &&
              <NoInvoice />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Invoices;
