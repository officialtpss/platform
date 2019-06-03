import React from 'react';
import styled from 'styled-components';

import Divider from '../components/Divider';
import DiffWrapper from '../components/DiffWrapper';
import CustomButton from '../../../components/PublicCustomButton';

class LandingPage extends React.Component {
  render() {
    const { openLogin, openSignUp } = this.props

    return (
      <StyledDiv>
        <section className="main">
          <img className="user-image" src="/img/Subtraction.png"/>
          <div className="invoice-controls">
            <div className="controls-wrapper">
              <div className="title-wrapper">
                <div className="invoice">Invoice</div>
                <div className="finance">Financing</div>
                <div className="era">...FOR A NEW ERA</div>
              </div>
              <div className="description">Bespoke Invoice Finance for businesses</div>
              <div className="controls">
                <CustomButton className="active" onClick={openSignUp}>GET STARTED</CustomButton>
                <CustomButton onClick={openLogin}>Log In</CustomButton>
              </div>
            </div>
          </div>
        </section>

        <section className="what-is-invoice">
          <div className="title">WHAT IS INVOICE FINANCE</div>
          <div className="description">
            <img src="/img/doc.svg" />
            <div className="description-detail">
              <div>
                <b>Invoice Finance </b>
                is a form of funding that instantly unlocks the cash tied up in outstanding sales invoices.
                Business owners allow invoice buyers to buy invoices at at discounted rate in order to 
                <b> unlock their cash </b>
                quicker.
                Once invoices are paid by the invoice debtor, the invoice buyer receives the amount previously agreed upon.
              </div>
              <br/>

              <div>
                Perhaps your business faces <b>Long payment cycles </b> with your customers, or maybe your business is business 
                is growing too fast and you need to collect cash quicker than customers will pay you to sustain.
                If this is something your business is experiencing, invoice financing could be the 
                <b> best funding solution </b> for your due to its flexibility and ability to unlock cash, fast.
              </div>
            </div>
          </div>
          <Divider className="divider" color="#42B6FB" width="300"></Divider>
          <div className="innovative">
            <i>An innovative approach to business funding</i>
          </div>
        </section>

        <section className="provide-flexible-service">
          <div className="description">
            We provide truly flexible invoice financing services where we allow invoice sellers to choose the invoices 
            to sell when they need to - 
            <span className="entire"> entirely up to you, no strings attached.</span>
          </div>

          <div>
            <CustomButton className="active" onClick={openSignUp}>GET STARTED</CustomButton>
          </div>
        </section>

        <section className="what-make-us-different">
          <div className="main-title">WHAT MAKES US DIFFERENT?</div>
          <DiffWrapper
            className="high-advance"
            direction="left"
            bgColor="white"
            titleColor="#589DF9"
            titleSrc="/img/growth.svg"
            title="High Advance"
            ctxColor="#2E3A4D"
            zIndex="9"
          >
            We offer one of the highest advances in the industry,
            <b> up to 95% </b>
            of the invoice amount.
          </DiffWrapper>

          <DiffWrapper
            className="competitive-rates"
            direction="right"
            bgColor="#2E3A4D"
            titleColor="white"
            titleSrc="/img/price-tag.svg"
            title="Competitive Rates"
            ctxColor="#589DF9"
            zIndex="8"
          >
            Populous World understands the needs of small to medium businesses, 
            and our fees truly reflect that. We understand that businesses require as much working capital being reinvested into the business as possible.
            However, it's often that these very businesses are charged the most for short
            team cash flow solutions.
          </DiffWrapper>

          <DiffWrapper
            className="quick-approval"
            direction="left"
            bgColor="#2981F7"
            titleColor="#2E3A4D"
            titleSrc="/img/clock.svg"
            title="Quick Approval"
            ctxColor="white"
            zIndex="7"
          >
            Our approval process can take as little as 48 hours. Join the list of satisfied customers within 2 days.
          </DiffWrapper>

          <DiffWrapper
            className="technology"
            direction="right"
            bgColor="white"
            titleColor="#589DF9"
            titleSrc="/img/brain.svg"
            title="Technology"
            ctxColor="#2E3A4D"
            zIndex="6"
          >
            <div>
              <b>Populous World</b> uniquely connects business owners with invoice buyers on a global scale by leveraging security and transparency. We effectively disrupt the traditional invoice finance system by eliminating the need for third parties or financial institutions by connecting businesses with global invoice buyers directly.
            </div>
          </DiffWrapper>

          <DiffWrapper
            className="pick-choose-invoice"
            direction="left"
            bgColor="#2E3A4D"
            titleColor="white"
            titleSrc="/img/receipt.svg"
            title="Pick and choose your invoices"
            ctxColor="#589DF9"
            zIndex="5"
          >
            <div>
              Populous World recognise that there is a gap in the marketplace for single invoices to be
              financed and have build our systems to offer invoice finance on a single invoice basis. 
              This is our way of making it easier and less restrictive for businesses to participate.
            </div>
            <br/>
            <div>
              You can credit insure a single invoice, as and when you need to, without having to get a full 
              turnover cover. Moreover, you get the quality of care from us: we truly value our clients and want 
              to see them grow and succeed.
            </div>
          </DiffWrapper>

          <DiffWrapper
            className="fees"
            direction="right"
            bgColor="#2981F7"
            titleColor="#2E3A4D"
            titleSrc="/img/fee.svg"
            title="Fees"
            ctxColor="white"
            zIndex="4"
          >
            <div>
              No set up/hidden fees:
            </div>
            <br/>
            <div>
              We do not believe in hidden clauses that eats into your bottom line.
              At <b>Populous World</b>, our fees are transparent and you know what you are paying for.
            </div>
          </DiffWrapper>

          <DiffWrapper
            className="no-lengthy-contracts"
            direction="left"
            bgColor="white"
            titleColor="#589DF9"
            titleSrc="/img/contract.svg"
            title="No lengthy contracts"
            ctxColor="#2E3A4D"
            zIndex="3"
          >
            <div>Sell your invoices with us without having to commit to <b>fixed lengthy contracts.</b></div>
            <br/>
          </DiffWrapper>

          <DiffWrapper
            className="reverse_auction"
            direction="right"
            bgColor="#2E3A4D"
            titleColor="white"
            titleSrc="/img/auction.svg"
            title="Reverse Auction"
            ctxColor="#589DF9"
            zIndex="2"
          >
            Our invoice buyers bid against one another to ensure you receive the lowest fees possible for your invoices.
          </DiffWrapper>
          
          <div className="populous-world">
            <img src="/img/shutterstock.png"/>
            <div className="populous-start">
              <div className="explain">POPULOUS WORLD, BUILT BY THE PEOPLE, FOR THE PEOPLE</div>
              <CustomButton className="active" onClick={openSignUp}>GET STARTED</CustomButton>
            </div>
          </div>
        </section>

        <section className="about">
          <img src="/img/logo_black.svg" width="200" />
          <div>
            <div className="main-title">ABOUT US</div>
            <p>
              At Populous World, we work with businesses that need external financial assistance to 
              <b> fund their growth </b>
              or ease short-term cash flow related issues. We endeavour to facilitate businesses globally, with our swift and innovative approach to business funding, allowing the invoice finance process to be
              <b> less restrictive </b>
              and easier for businesses to on board.
            </p>
            <p>
              Our invoice finance platform is well positioned to break down the barriers of funding and allow more companies to participate in this market place -
              <b> raising finance </b>
              from outstanding invoices, but on a selective basis.
            </p>
            <p>
              Armed with a team of highly experienced technology and finance experts.
              Populous World are well positioned to
              <b> disrupt the invoice finance industry.</b>
            </p>
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
    height: 50vw;
    z-index: 2;

    .user-image {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      z-index: 3;
      filter:drop-shadow(-10px -5px 5px #0E1A30);
    }

    .invoice-controls {
      position: absolute;
      width: 50%;
      height: 100%;
      border-bottom-right-radius: 500px;
      color: white;
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: center;

      .title-wrapper {
        font-size: 48px;
        font-weight: bold;
        border-left: solid 10px #31c8fc;
        padding-left: 20px;
        margin-bottom: 20px;

        .invoice {
          line-height: 52px;
        }

        .finance {
          line-height: 80px;
        }

        .era {
          font-size: 24px;
          color: #31c8fc;
        }
      }

      .controls {
        button {
          margin-right: 10px;
        }
      }

      .description {
        margin-bottom: 40px;
        font-size: 12px;
      }
    }
  }

  .what-is-invoice {
    padding: 50px 140px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 36px;
      font-weight: bold;
      color: #31c8fc;
      margin-bottom: 8px;
    }

    .description {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      img {
        margin-right: 20px;
        width: 82px;
      }

      .description-detail {
        display: flex;
        flex-direction: column;
        text-align: left;
        justify-content: space-between;
      }
    }

    .divider {
      margin-bottom: 10px;
    }

    .innovative {
      font-size: 36px;
    }
  }

  .provide-flexible-service {
    background: url('/img/background2.png');
    height: 400px;
    text-align: center;
    padding: 88px 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;

    .description {
      font-size: 34px;
      font-family: 'AmTypeWriter';

      .entire {
        color: #42B6FB;
      }
    }
  }

  .what-make-us-different {
    background-color: white;

    .main-title {
      font-size: 36px;
      text-align: center;
      position: relative;
      z-index: 11;
      background-color: white;
      padding-top: 55px;
      font-weight: bold;
    }

    .populous-world {
      position: relative;
      img {
        width: 100%;
        margin-top: -50px;
      }

      .populous-start {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 28px 140px;
        background-color: #2E3A4D85;
        text-align: center;

        .explain {
          font-size: 32px;
          font-weight: bold;
          color: white;
        }
      }
    }
  }

  .about {
    padding: 70px 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    img {
      margin-right: 80px;
    }

    .main-title {
      font-size: 32px;
      color: #42B6FB;
      font-weight: bold;
    }
  }
`

export default LandingPage
