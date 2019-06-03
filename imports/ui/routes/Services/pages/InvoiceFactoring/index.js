import React from 'react';
import styled from 'styled-components';
import MetaTags from 'react-meta-tags';

import InvoiceCard from '../../components/InvoiceCard'
import InvoiceCheckParagraph from '../../components/InvoiceCheckParagraph'
import Divider from '../../components/Divider'

class InvoiceFactoring extends React.Component {
  render() {
    return (
      <StyledDiv>
        <MetaTags>
          <title>What is Invoice Factoring</title>
          <meta name="description" content="Factoring can significantly improve the performance and financial health of your business manages your credit control and recovers payments from your debtors, which means all you have to do is sit back and focus on growing your business." />
        </MetaTags>

        <section className="main">
          <img className="user-image" src="/img/Union 1.png" />
          <div className="invoice-controls">
            <div className="controls-wrapper">
              <div className="invoice-factoring">Invoice Factoring</div>
              <div className="invoice-description">We take care of your credit control function</div>
              <div className="invoice-description">And recover payments from your customers</div>
            </div>
          </div>
        </section>

        <section className="cards-wrapper">
          <div className="wrapper-title">
            RELEASE CASHFLOW IN 24 HOURS, FOCUS ON GROWING YOUR BUSINESS AND WE DO THE CHASING FOR YOU!
          </div>

          <InvoiceCard
            title="How does Invoice Factoring differ to Invoice Discounting?"
            direction="left"
            imgSrc="/img/Depositphotos_14899525_xl-2015.png"
          >
            <p>
              Invoice Factoring is an efficient and flexible way to release regular amounts of working capital. It removes the stress and pressure of paying staff and overheads on time, allowing you to plan ahead for sustainable growth.
            </p>
            <p>
              The definitive difference between Invoice Factoring and Invoice Discounting is defined by who takes control of the sales ledger and responsibility for collecting payment.
            </p>
            <p>
              Factoring can significantly improve the performance and financial health of your business manages your credit control and recovers payments from your debtors, which means all you have to do is sit back and focus on growing your business.
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <InvoiceCard
            title="Does your business suit Invoice Factoring?"
            direction="right"
            imgSrc="/img/Depositphotos_10520578_xl-2015.png"
          >
            <p>
              Do you experience 30-90 day payment cycles with your customers and want someone to manage your credit control? If yes, then Factoring could be the answer to your current situation.
            </p>
            <p>
              If you’re a growing business that is relatively small and your human resources are limited, the credit control and collection service that comes with Factoring is compatible for you.
            </p>
            <p>
              Factoring can take the time and hassle off your hands, especially when you don’t have the capacity to chase debtors’ payments.
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <InvoiceCard
            title="How can our Invoice Factoring facility help your business?"
            direction="left"
            imgSrc="/img/Depositphotos_111697232_xl-2015.png"
          >
            <InvoiceCheckParagraph>
              Complete credit control and collection service, enabling you to focus your resources on other areas of your business.
            </InvoiceCheckParagraph>
            <InvoiceCheckParagraph>
              For startups, Factoring offers flexible start-up finance to get your new company off the ground.
            </InvoiceCheckParagraph>
            <InvoiceCheckParagraph>
              The process of Invoice Factoring closes those cashflow dips and saves you the hassle of having to chase your customers, compared to Invoice
            </InvoiceCheckParagraph>
            <InvoiceCheckParagraph>
              Discounting where you take control of your credit control and debt collections yourself. Growth plans – Invoice Factoring can be one of the most reliable ways to fund growth without compromising your current cashflow position.
            </InvoiceCheckParagraph>
            <InvoiceCheckParagraph>
              Factoring mitigates the need for other types of funding; Factoring is flexbile and offers fast access to funding without the risk of excessive debt.
            </InvoiceCheckParagraph>
          </InvoiceCard>
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
          line-height: 68px;
          color: white;
          font-weight: bold;
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

    .divider-wrapper {
      width: 100%;
      padding-top: 40px;
      padding-bottom: 40px;
      display: flex;
      justify-content: center;
    }
  }
`

export default InvoiceFactoring
