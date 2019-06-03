import React from 'react';
import { Container, Col, Row, Collapse} from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { H1, Small } from '../../../components/styled-components/Typography';
import { InvoicesHeader, FilterButton } from '../../../components/styled-components/Invoices/InvoicesList';
import { CurrencyPadDesc, CurrencyMobileDesc } from '../../../components/styled-components/Invoices/Invoice';
import LoadMoreSpinner from '../../../components/LoadMoreSpinner';
import NoInvoice from '../../../components/NoInvoice/NoInvoice';
import InvoicesFilters from './InvoicesFilters';
import InvoicesSearch from './InvoicesSearch';
import InvoiceCard from '../../Invoices/components/InvoiceCard';
import InvoiceFunds from './InvoiceFunds';


class Market  extends React.Component {
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
      moreOption: false
    };
  }

  componentWillMount() {
    const {currentUser} = this.props;
    if (currentUser.settings && typeof currentUser.settings.marketFilter === 'object'
      && Object.keys(currentUser.settings.marketFilter).length) {
      this.props.setFilters(currentUser.settings.marketFilter);
      this.setState({filters: currentUser.settings.marketFilter});
      if(currentUser.settings.marketFilter.previewMode) {
        this.props.togglePreviewMode();
      }
    }
  }

  componentWillUnmount() {
    this.props.previewExhanceForInvoice(null);
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

      if (salePrice.max < 0 || salePrice.max != nextProps.filters.salePriceLimit.max) {
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

      this.setState({
        filters: newFilters
      });
    }
  }

  changeActiveColumn = (param) => {
    let activeColumns = this.state.activeColumns;
    activeColumns[param] = !activeColumns[param];
    this.setState({activeColumns});
  };

  updateFilters = (updates) => {
    let newFilters = {...this.state.filters, ...updates};
    this.setState({filters: newFilters});
  };

  resetFilters = () => {
    this.setState({filters: this.props.filters});
  };

  toggleMoreOption = () => {
    this.setState({moreOption: !this.state.moreOption});
  };

  render() {
    const { currencies, currentUser, invoices, showFilters, toggleFilters,
      setFilters, saveFilters, hasMore, loading, balances, crowdsales,
      baseCurrency, setBaseCurrency, previewExhanceForInvoice, previewMode, togglePreviewMode,
      previewModeTooltip, togglePreviewModeTooltip, exchangePreview,
      incrementCurrentPage,
      // quick filters
      setTextSearch,
      setSortColumn,
      setSortOrder,
      keyword,
      filters:{sortColumn, sortOrder}
    } = this.props;

    if (!!loading) {
      return <div className="loader m-t-10"><LoadMoreSpinner /></div>;
    }

    return (
      <Container>
        <Row className="page-title">
          <Col className="p-0">
            <InvoicesHeader>
              <H1>Invoice Market</H1>
              <FilterButton onClick={() => toggleFilters()} primary={showFilters ? '' : 'primary'}>
                <img src={showFilters?"/img/icons/ico-filters.svg":"/img/icons/ico-filters-white.svg"} height={30}/>
                <span className="m-l-5 align-middle">Filters</span>
              </FilterButton>
            </InvoicesHeader>

            <CurrencyPadDesc>
              <Small>Find out more about buying invoices. Read our <Link to={'#'}>investors guide</Link></Small>
            </CurrencyPadDesc>
            <CurrencyMobileDesc>
              <Link to={'#'}>Investors guide</Link>
            </CurrencyMobileDesc>
          </Col>
          { currentUser.isInvestor() &&
            <InvoiceFunds  />
          }
        </Row>

        <div className="m-b-30">
  		    <Collapse isOpen={showFilters} className="m-b-50">
            <InvoicesSearch
              onSearch={(searchFilters) => { saveFilters(searchFilters); setFilters(searchFilters); }}
              onReset={() => this.resetFilters()}
              filters={this.state.filters}
              onUpdateFilters={(updates) => this.updateFilters(updates)}
              baseCurrency={baseCurrency}
              currencies={currencies}
              toggleFilters={toggleFilters}
              onBaseCurrencyChange={setBaseCurrency}
              togglePreviewMode={togglePreviewMode}
              previewMode={previewMode}
              togglePreviewModeTooltip={togglePreviewModeTooltip}
              previewModeTooltip={previewModeTooltip}
              currentUser={currentUser}
              push={this.props.history.push}
              toggleMoreOption={this.toggleMoreOption}
              moreOption={this.state.moreOption}
            />
          </Collapse>
          <InvoicesFilters
            keyword={keyword}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
                           updateSortBy={ setSortColumn }
                           updateSortOrder={setSortOrder}
                           updateFullTextSearch={ setTextSearch}
                           changeActiveColumn={this.changeActiveColumn}
          />
          <InfiniteScroll
            pageStart={0}
            loadMore={incrementCurrentPage}
            hasMore={hasMore}
            loader={<div className="loader m-t-10" key={'market-load-more'}><LoadMoreSpinner text={'Load More'} /></div>}
            initialLoad={false}
          >
            { invoices.map((invoice, i) => <InvoiceCard
              currentUser={currentUser}
              invoice={{...invoice, preview: exchangePreview[invoice._id], }} key={i}
              activeColumns={this.state.activeColumns}
              previewExhanceForInvoice={previewExhanceForInvoice}
              balances={balances}
              crowdsales={crowdsales}
              previewMode={previewMode}
              currencies={currencies}
              baseCurrency={baseCurrency}
            />)}

            { invoices.length === 0 && !hasMore &&
              <NoInvoice />
            }
          </InfiniteScroll>
        </div>
      </Container>
    );
  }
}

export default Market;
