import React from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap'

import Divider from '../../components/Divider'
import CustomButton from '../../../../components/PublicCustomButton'
import CalendarTile from '../../components/CalendarTile'
import QuestionCard from '../../components/QuestionCard'

class FinanceInvoices extends React.Component {
  render() {
    const { signup } = this.props

    const invoiceData = [
      {
        invoice: '16,137.22',
        received: '15,749.92',
        period: 30
      },
      {
        invoice: '16,156.80',
        received: '15.749.92',
        period: 40
      },
      {
        invoice: '3,387.09',
        received: '3,305.80',
        period: 60
      },
      {
        invoice: '4,117.35',
        received: '4,018.53',
        period: 60
      },
      {
        invoice: '3,022.96',
        received: '2,950.41',
        period: 30
      },
      {
        invoice: '3,123.10',
        received: '3,048.14',
        period: 60
      },
      {
        invoice: '3,516.53',
        received: '3,432.13',
        period: 60
      },
      {
        invoice: '3,316.22',
        received: '3,236.63',
        period: 60
      },
      {
        invoice: '3,131.56',
        received: '3,056.40',
        period: 60
      },
      {
        invoice: '3,567.89',
        received: '3,482.26',
        period: 60
      },
      {
        invoice: '4,659.34',
        received: '4,547.51',
        period: 30
      },
      {
        invoice: '52,951.90',
        received: '51,681.06',
        period: 40
      },
      {
        invoice: '8,592.00',
        received: '8,385.79',
        period: 40
      },
      {
        invoice: '28,931.80',
        received: '28,931.80',
        period: 60
      },
      {
        invoice: '4,140.00',
        received: '3,995.10',
        period: 30
      },
      {
        invoice: '5,760.00',
        received: '5,558.40',
        period: 30
      },
      {
        invoice: '5,400.00',
        received: '5,211.00',
        period: 30
      },
      {
        invoice: '5,388.00',
        received: '5,199.42',
        period: 30
      },
      {
        invoice: '3,690.00',
        received: '3,560.85',
        period: 30
      },
      {
        invoice: '120,000.00',
        received: '114,600.00',
        period: 45
      },
      {
        invoice: '60,000.00',
        received: '57,300.00',
        period: 30
      },
      {
        invoice: '224,544.00',
        received: '213,765.89',
        period: 30
      },
      {
        invoice: '178,200.00',
        received: '169,646.40',
        period: 30
      },
      {
        invoice: '1,680.00',
        received: '1,596.98',
        period: 30
      },
      {
        invoice: '336.00',
        received: '311.36',
        period: 30
      },
      {
        invoice: '1,008.00',
        received: '956.48',
        period: 30
      },
      {
        invoice: '1,330.00',
        received: '1,263.58',
        period: 30
      },
      {
        invoice: '178,200.00',
        received: '169,646,49',
        period: 30
      }
    ]

    const workAnswers = [
      "Populous World performs verification checks on the invoice and the business.",
	    "Sellers upload invoices onto the platform.",
	    "Auction opens and buyers can view which invoices to bid on in our ‘Invoice Market’",
	    "Buyers purchase the invoice.",
	    "Debtor pays invoice in full to seller, buyers receive principle amount plus interest."
    ]

    const bidAnswers = [
      "Register or sign into your ‘Populous World Invoice Buyer account’.",
      "Go to ‘My Invoices’ and select ‘Buy Invoices on the Market’ where a list of invoices will be displayed.",
      "Click on the invoice with the status ‘Auction Open’ and you will be able to see details of the invoice.",
      "Enter your bid amount in ‘Your Bid’.",
      "After entering your bid, click ‘Submit Bid’ and you will have successfully made a bid!"
    ]

    const buyInvoices = [
      "Yes. Invoice buyers are not restricted by geographical location; however, it’s your responsibility to make sure you are complying with all rules and regulations where you live."
    ]

    return (
      <StyledDiv>
        <div className="hero-section">
          <div className="section-wrapper">
            <div className="title">Finance Invoices</div>
            <div className="check-items-wrapper">
              <div className="answer-wrapper">
                <span className="check-mark">✔ </span>
                <span>Higher returns compared to savings accounts</span>
              </div>

              <div className="answer-wrapper">
                <span className="check-mark">✔ </span>
                <span>Flexible and compatible with your risk criteria</span>
              </div>

              <div>
                <span className="check-mark">✔ </span>
                <span>No fees for invoice buying</span>
              </div>
            </div>

            <div className="button-wrapper">
              <CustomButton onClick={signup} size="md">GET STARTED</CustomButton>
            </div>
          </div>
        </div>

        <div className="main-section">
          <div className="populous-finance">
            <p>
              <b>Invoice Financing</b> is reported to be a <b>$3 trillion-a-year</b> global market. It helps businesses with cash flow problems by allowing them to sell invoices immediately after
            </p>

            <p>
              <b>Populous World</b> is an innovative ecosystem that helps companies sell invoices for typically <b>95% of their value</b> for an invoice with 30-day payment terms. To facilitate the matching of invoice buyers and sellers, the team have built a native (and incentive-driven) credit rating platform that will initially use publicly available, UK registered limited company data.
            </p>

            <div className="calendar-wrapper">
              <div className="calendars">
                <CalendarTile
                  imgSrc="/img/year-2018.svg"
                  title="Invoices financed in 2018"
                  payAmount="£2,560,367.26"
                  year="2018"
                />

                <CalendarTile
                  imgSrc="/img/year-2019.svg"
                  title="Invoices finance to date (2019):"
                  payAmount="£944,287.76"
                  year="2019"
                />
              </div>
            </div>
          </div>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <div className="auction-to-date">
            <div className="title-wrapper">
              <div className="main-title">Auctions to date</div>
              <div className="sub-title">(Discounts range from 4.5% to as low as 1.75%)</div>
            </div>

            <div className="table-wrapper">
              <Table striped>
                <thead>
                  <tr>
                    <th>Invoice amount £</th>
                    <th>Seller received £</th>
                    <th>Period (days)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.invoice}</td>
                      <td>{invoice.received}</td>
                      <td>{invoice.period}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <QuestionCard
            imgSrc="/img/website-icon.png"
            title="How does it work?"
            answers={workAnswers}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <QuestionCard
            imgSrc="/img/auction-icon.png"
            title="How to bid on an invoice?"
            answers={bidAnswers}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <QuestionCard
            imgSrc="/img/worldwide-icon.png"
            title="Can I buy invoices on Populous World if I don't live in one of the supported countries?"
            answers={buyInvoices}
          />
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  .hero-section {
    background: url('/img/shutterstock_762123613.png') no-repeat;
    background-size: cover;
    background-color: #000000;
    color: white;
    width: 100%;
    height: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .section-wrapper {
      .title {
        font-size: 48px;
        line-height: 60px;
        font-weight: bold;
      }

      .check-items-wrapper {
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 20px;

        .check-mark {
          color: #42b6fb;;
        }
      }

      .button-wrapper {
        text-align: center;
        margin-bottom: 0;

        button {
          background-color: #42b6fb;
          width: auto;
        }
      }
    }
  }

  .main-section {
    padding: 50px 240px;
    font-size: 14px;

    .populous-finance {
      .calendar-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        .calendars {
          width: 520px;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .auction-to-date {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title-wrapper {
        margin-bottom: 20px;

        .main-title {
          font-size: 30px;
          font-weight: bold;
          line-height: 25px;
        }

        .sub-title {
          color: #589DF9;
          font-weight: 400;
        }
      }

      .table-wrapper {
        border-radius: 10px;
        border: solid 1px #aaa;
        overflow: hidden;

        table {
          width: 520px;
          margin-bottom: 0;
          th, td {
            padding: 0;
          }
        }
  
        .table-striped {
          thead {
            background-color: #178de050;
          }
          tbody {
            tr:nth-of-type(odd) {
              background-color: rgba(9, 204, 249, 0.1);
            }
          }
        }
      }
    }

    .divider-wrapper {
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: center;
    }
  }
`

export default FinanceInvoices
