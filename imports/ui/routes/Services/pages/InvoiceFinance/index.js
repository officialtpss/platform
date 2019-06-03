import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';

import InvoiceCard from '../../components/InvoiceCard'
import ReasonCard from '../../components/ReasonCard'
import Divider from '../../components/Divider'

class InvoiceFactoring extends React.Component {
  render() {
    return (
      <StyledDiv>
        <MetaTags>
          <title>What is Invoice Finance</title>
          <meta name="description" content="Invoice Finance is a compatible match for businesses that endure long payment terms with customers. When a customer defaults on a payment or takes too long to pay, it can create a financial dent in your cashflow, making it impossible for you to make ends meet and keep your business afloat." />
        </MetaTags>

        <section className="main">
          <img className="user-image" src="/img/Union 4.png" />
          <div className="invoice-controls">
            <div className="controls-wrapper">
              <div className="invoice-factoring">Invoice Finance</div>
              <div className="invoice-description">NO NEED TO WAIT 30 - 60 DAYS FOR YOUR CUSTOMERS TO</div>
              <div className="invoice-description">PAY YOU, UNLOCK THE CASH YOU NEED IN JUST 24 HOURS</div>
            </div>
          </div>
        </section>

        <section className="cards-wrapper">
          <div className="wrapper-title">
            DID YOU KNOW THAT THE INVOICE FINANCE SECTOR IS ONE OF THE FASTES GROWING INDUSTRIES AND IS NOW A PREFERRED FUNDING SOLUTION DUE TO ITS FLEXIBILITY AND SPEED?
          </div>

          <InvoiceCard
            title=""
            direction="left"
            imgSrc="/img/Depositphotos_33445393_xl-2015.png"
          >
            <p>
              Invoice Finance is a compatible match for businesses that endure long payment terms with customers. When a customer defaults on a payment or takes too long to pay, it can create a financial dent in your cashflow, making it impossible for you to make ends meet and keep your business afloat.
            </p>
            <p>
              We at Populous World are customer-friendly, we truly care and value our clients. Our platform uses innovative technology to drive down costs and minimise turnaround times. Our Invoice Finance platform is a fast, flexible and transparent way to bridge cashflow shortfalls and maintain positive financial health.
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <InvoiceCard
            title="Accelerate your operations and performance"
            direction="right"
            imgSrc="/img/Depositphotos_254761022_xl-2015.png"
          >
            <p>
              When you have cash in the bank, it makes running a business that bit easier.
            </p>
            <p>
              Rather than sleepless nights worrying about how you will meet staff payments, overheads, fixed costs and daily operation costs, you will have cash ready for any essential overheads.
            </p>
            <p>
              Not having the financial stress on your hands will increase the performance and efficiency of not only yourself, but your workers too.
            </p>
          </InvoiceCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <InvoiceCard
            title="Sustain and Grow"
            direction="left"
            imgSrc="/img/Depositphotos_202354648_xl-2015.png"
          >
            <p>
              Invoice Finance can help you to make the most out of your cashflow and effectively sustain the. The influx of cash allows you to worry less about daily operations and frees up your time to focus on investment opportunities, new projects and fulfil growth plans.
            </p>
            <p>
              Whether you are offering a product or service, Invoice Finance will allow you to have the cash you need to buy new stock, pay suppliers, meet customer demands or purchase new equipment.
            </p>
          </InvoiceCard>
        </section>

        <section className="fee-section">
          <div className="fee-wrapper">
            <div>ONE SIMPLE FEE.</div>
            <div>NO MINIMUM LENGTH CONTRACT.</div>
          </div>
        </section>

        <section className="why-populous-world">
          <div className="title">WHY POPULOUS WORLD</div>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Bespoke finance">
                Pick and choose your invoices. Unlike most providers, you can finance single invoices on our platform, rather than your entire ledger. You can credit insure a single invoice, as and when you need to, without having to get a full turnover cover. Moreover, you get the quality of care from us; we truly value our clients and want to see them grow and succeed.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Dedicated account manager">
                When you choose to finance your invoices with us, a dedicated account manager will be allocated to assist you with your account settings, maintain your personal requests and plan future funding requirements.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Competitive Rates">
                Populous World understands the needs of small medium businesses, and our fees truly reflect that. We understand that businesses require as much working capital being reinvested into the business as possible. However, it’s often that these very businesses are charged the most for short term cash flow solution.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="No lengthy contracts">
                Sell your invoices with us without having to commit to fixed lengthy contracts.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Quick Approval">
                Our approval process can take as little as 48 hours. Join the list of satisfied customers within 2 days.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="High Advance">
                We offer one of the highest advances in the industry, up to 98.5% of the invoice amount.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Fees">
                Populous World is a P2P (peer-to-peer) Invoice Finance platform that is globalising what is currently a localised and limited market sector. We are a global invoice trading platform built on Blockchain’s distributed ledger technology.
              </ReasonCard>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <ReasonCard title="Reverse Auction">
                Our invoice buyers bid against one another to ensure you receive the lowest fees possible for your invoices.
              </ReasonCard>
            </Col>
          </Row>
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

    .divider-wrapper {
      width: 100%;
      padding-top: 40px;
      padding-bottom: 40px;
      display: flex;
      justify-content: center;
    }
  }

  .fee-section {
    background: url('/img/DobZU4_W0AAeSEC.png');
    padding: 64px 140px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    min-height: 420px;
    background-size: cover;

    .fee-wrapper {
      font-size: 36px;
      color: white;
      line-height: 52px;
      font-weight: bold;
    }
  }

  .why-populous-world {
    padding: 30px 140px;

    .title {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      line-height: 50px;
      margin-bottom: 30px;
      color: #589DF9;
    }
  }
`

export default InvoiceFactoring
