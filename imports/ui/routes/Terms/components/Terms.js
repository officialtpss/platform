import React from 'react';
import styled from 'styled-components';
import { fixtures } from 'meteor/populous:constants';
import Scrollchor from 'react-scrollchor';
import { Container, Col, Row} from 'reactstrap';
import ConfirmationForm from './ConfirmationForm';

import Spinner from '../../../components/Spinner/index';
import { H1, H4, Lead } from '../../../components/styled-components/Typography';
import '../../../libs/styles/terms.css';

class Terms extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      roleConfirmed: false,
      termsConfirmed: false,
    };
  }

  confirmationToggle = (checkboxName) => {
    this.setState({
      [checkboxName]: !this.state[checkboxName],
    });
  };

  getTitle = () => {
    return this.props.termsAndConditions.map((item, index) => (
      <li key={index}><Scrollchor to={"term" + ++index} className="nav-link">{item.title}</Scrollchor></li>
    ))
  };

  getContent = () => {
    return this.props.termsAndConditions.map((item, index) => {
      let content = item.content;

      // add class "child"
      if (/<p>\(*[0-9]+\)/.test(content)) {
        content = content.replace(/<p>\(*[0-9]+\)/g, (item) => {
          return '<p class="child">' + item.substr(3, item.length);
        });
      }
      //add class "child2"
      if (/<p>\(*[A-Za-z]\)/.test(content)) {
        content = content.replace(/<p>\(*[A-Za-z]\)/g, (item) => {
          return '<p class="child2">' + item.substr(3, item.length);
        });
      }

      return (
        <Col xs={12} id={"term" + ++index} key={index}>
          <h3><span className="index">{index}</span>{item.title}</h3>
          <div dangerouslySetInnerHTML={{__html: content}}/>
        </Col>
      );
    })
  };

  render() {
    const {loading, currentUser, setTermsConfirmed, currentVersionTermsAndConditions, className} = this.props;

    if (loading) {
      return <Spinner/>;
    }

    return (
      <Container className={`terms ${className}`}>
        <Row>
          <Col className="page-title">
            <H1 className="d-block d-md-inline-block">
              The Rules of Populous Platform Trading
            </H1>
            <Lead>Registered Users Invoice Trading Platform</Lead>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4} className="short-list">
            <H4>Order of Clauses</H4>
            <ol>
              {this.getTitle()}
            </ol>
          </Col>

          <Col xs={12} sm={8} className="terms-content">

            {this.getContent()}

            {currentUser && currentVersionTermsAndConditions !== currentUser.termsVersionConfirmed &&
            <ConfirmationForm
              confirmationToggle={this.confirmationToggle}
              setUserTermsConfirmed={setTermsConfirmed}
              roleConfirmed={this.state.roleConfirmed}
              termsConfirmed={this.state.termsConfirmed}
              currentUser={currentUser}
            />
            }
          </Col>
        </Row>
     </Container>
    );
  }
};


export default styled(Terms)`
  p {
    line-height: 1.5;
    font-family: 'PT Sans', sans-serif;
    font-size: 0.875rem;
    @media(min-width: 992px) {
      font-size: 1rem;
    }
  }
`