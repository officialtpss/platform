import React from 'react';
import styled from 'styled-components';
import MetaTags from 'react-meta-tags';

import InvoiceCard from '../../components/InvoiceCard'
import RoundCard from '../../components/RoundCard'
import Divider from '../../components/Divider'

class InvoiceDiscounting extends React.Component {
  render() {
    return (
      <StyledDiv>
        <MetaTags>
          <title>What is Invoice Discounting</title>
          <meta name="description" content="A concerning factor when using a finance provider is the exposure to third parties, however, with Invoice Discounting, the service is completely confidential, which means your customers and competitors are unaware that you’re using it!" />
        </MetaTags>

        <section className="main">
          <img className="user-image" src="/img/Union 9.png" />
          <div className="invoice-controls">
            <div className="controls-wrapper">
              <div className="invoice-factoring">Invoice Discounting</div>
              <div className="invoice-description">WE LEAVE YOUR CUSTOMERS ALONE AND YOU RECOVER</div>
              <div className="invoice-description">PAYMENTS AS YOU HAVE DONE SO BEFORE.</div>
            </div>
          </div>
        </section>

        <section className="cards-wrapper">
          <InvoiceCard
            title="Release cash"
            direction="right"
            imgSrc="/img/Depositphotos_5701908_xl-2015.png"
          >
            <p>
              Use our confidential Invoice Discounting facility to release cash against your unpaid invoices <b>within 24 hours</b> and maintain a healthy cashflow balance!
            </p>
            <p>
              Working capital is unlocked to win the fight against cashflow shortfalls and <b>grow your business</b>.
            </p>
            <p>
              Invoice Discounting grows with your business! The level of funding available increases with your turnover.
            </p>
            <p>
              For a business which has to deal with slow payments cycles, Invoice Discounting is a definitive way to have a funding solution that is <b>fast and flexible</b>.
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <InvoiceCard
            title="Why use Invoice Discounting at Populous World?"
            direction="left"
            imgSrc="/img/Depositphotos_10520578_xl-2015.png"
          >
            <p>
              Our Invoice Discounting mechanism can be a big help when businesses are dealing with the lengthy payment terms often associated with big contracts or large orders, especially in today’s lending climate where restrictions and barriers make it difficult for businesses to borrow funds from banks or traditional lenders.
            </p>
            <p>
              A concerning factor when using a finance provider is the exposure to third parties, however, with Invoice Discounting, the service is completely confidential, which means your customers and competitors are unaware that you’re using it!
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <div className="key-advantage">
            <div className="title">Some of our key advantages include</div>
            <div className="round-card-wrapper">
              <RoundCard>
                Your business retains control of its own sales ledger and recovers payment from customers in the usual way
              </RoundCard>
              <RoundCard>
                Confidentiality your customers and competitors are not aware that you are using an Invoice Discounting provider
              </RoundCard>
              <RoundCard>
                You secure management of your own credit control and debt collection
              </RoundCard>
              <RoundCard>
                Customers still pay you directly as normal; there is no need for them to know that a third party is involved
              </RoundCard>
              <RoundCard>
                Competitive pricing take advantage of our low rates and no hidden costs!
              </RoundCard>
              <RoundCard>
                Your business can receive valuable guidance and work towards growth plans with your very own dedicated account manager
              </RoundCard>
              <RoundCard>
                Invoice Discounting can help to improve your credit rating and open up new avenues to explore in other investment opportunities and expansion plans.
              </RoundCard>
            </div>
          </div>
        </section>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  width: 100%;

  .main {
    position: relative;
    background-color: #2b3f5c;
    height: 35vw;
    z-index: 2;

    .user-image {
      position: absolute;
      top: 0;
      right: 0;
      width: 70%;
      height: 100%;
      z-index: 3;
      filter: drop-shadow(-10px -5px 5px #0E1A30);
    }

    .invoice-controls {
      position: absolute;
      width: 45%;
      height: 100%;
      border-bottom-right-radius: 500px;
      color: white;
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: center;

      .controls-wrapper {
        .invoice-factoring {
          font-size: 48px;
          font-weight: bold;
          line-height: 68px;
          color: white;
        }

        .invoice-description {
          font-size: 18px;
          line-height: 25px;
          color: #589DF9;
        }
      }
    }
  }

  .cards-wrapper {
    padding: 50px 140px;

    .wrapper-title {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      line-height: 46px;
      color: #589DF9;
      padding: 0 90px;
      margin-bottom: 50px;
    }

    .key-advantage {
      .title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        line-height: 35px;
        margin-bottom: 25px;
      }

      .round-card-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-left: -21px;
        margin-right: -21px;
      }
    }

    .divider-wrapper {
      width: 100%;
      padding-top: 40px;
      padding-bottom: 40px;
      display: flex;
      justify-content: center;
    }
  }

`

export default InvoiceDiscounting
