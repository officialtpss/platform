import React from 'react';
import styled from 'styled-components';

import Divider from '../../components/Divider'
import KnowledgeArrayCard from '../../components/KnowledgeArrayCard'
import KnowledgeCard from '../../components/KnowledgeCard'

class KnowledgeBase extends React.Component {
  render() {
    const invoiceWorkAnswers = [
      "On a day-to-day basis, businesses send out invoices as orders are fulfilled. The pre-agreed percentage of each invoice is deposited to the businesses bank account once a copy of the invoice has been received and validated by the lender. The money can then be used to pay bills, repay debt, improve cash flow or as part of a long-term plan for a growth spurt."
    ]

    const adoptingSteps = [
      "You provide sale of goods or services to your customer.",
      "Upon verification and risk assessment, provide the invoice that will be payable to 'Populous World' to your customer.",
      "Upload said invoice onto our platform which then invites invoice buyers to bid on your invoice.",
      "Receive the cash flow within 24 hours of the auction closing sans interest fee.",
      "Upon repayment, the customer repays the invoice by making a full payment to 'Populous World'."
    ]

    return (
      <StyledDiv>
        <div className="hero-section">
          <div className="background-wrapper"></div>
          <div>Knowledge Base</div>
        </div>

        <div className="main-section">
          <KnowledgeArrayCard
            title="How does Invoice Finance work?"
            answers={invoiceWorkAnswers}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeArrayCard
            title="What steps does your business undertake when adopting Populous World? Our process is as simple as these 5 steps:"
            answers={adoptingSteps}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="Q: What fees are involved?">
            <p>Populous World offers a fixed fee service with no hidden charges. All quotes are final and once accepted, will be the only fee levied by Populous World. Our fee ranges from 2-4% of the amount of the invoice within a 30-90 day repayment term.</p>
            <p>(Please feel free to contact our team for fee quotations if you require a specifically structured product).</p>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="What Invoice Finance structure does Populous World offer?">
            Invoices can be sold on the Populous World platform individually. This presents a client with full control of their facility, where they can subscribe to the service on a ‘pay-as-you-use’ basis. A client can choose to discount their entire trade receivables or appoint our services tailored to the needs of the business.
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="Invoice Factoring vs Invoice Discounting">
            <p>Invoice Factoring and Invoice Discounting are both services that Populous World provides. They both can be used to release the funds tied up in a company’s outstanding invoices. There are a few essential differences between Invoice Factoring and Invoice Discounting, the key differences mainly falls upon who agrees to take responsibility in collecting the repayment from the debtor from their outstanding receivables.</p>
            <p>With Invoice Factoring, the provider takes control of managing the sales ledger, credit checks and control and also following up customers to settle outstanding payments.</p>
            <p>With Invoice Discounting, the provider takes a step back and allows your business to retain and maintain control of its own sales ledger and recollect payment in the usual way your business would.</p>
            <p>Another significant difference between Invoice Factoring and Invoice Discounting is confidentiality.</p>
            <p>With Invoice Factoring, the repaying customer settles the debt of their invoice directly with their provider, so your customers will most definitely be aware of your factoring arrangement.</p>
            <p>With Invoice Discounting, the repaying customer settles the debt of their invoice directly to your business as per normal so there is no need for them to know of your involvement with your finance provider.</p>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="What are the requirements?">
            <p>As with all financial services, certain criteria does need to be met in order to ensure that the factoring contract will be beneficial and sustainable. Populous World requires the following:</p>
            <div><b>Credit insurance</b></div>
            <p>We require our clients that we work with to have credit insurance with us as the beneficiary.</p>
            <div><b>Deed of debenture</b></div>
            <p>A debenture is a written agreement between an invoice buyer and seller, which sets out the charges and details the terms and conditions. When utilising Populous World’s services, your business would be entering into a deed of debenture with us, to securitise assets of your company. In the event that your business cannot meet the repayment terms, Populous World would legally be entitled to claim any funds owed to us.</p>
            <div><b>Guarantee</b></div>
            <p>A signed guarantee from the client over the balance of the outstanding invoice amount.</p>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeArrayCard
            title="What is working capital?"
            answers={[ 'Working capital is the available funds or cash flow available to operate the daily functions of a business. Working capital is calculated as current assets minus current liabilities on the balance sheet and is essentially the money that businesses need to operate.' ]}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeArrayCard
            title="Credit ratings - what is involved?"
            answers={[ 'There are many factors involved in providing a credit rating to your company, which will determine the quoted interest rates. Among the factors considered is the Altman Z-score where it takes into account a client’s past and current financial information. Generally, the process involves the client’s most recent audited financial statements, or equivalent for companies that receive exemptions from financial statement audits and other documentations as necessary.' ]}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="Tips for cashflow">
            <div className="para">
              Running a business without cash flow is almost impossible and the reason for why businesses fall into administration. It is fundamental that businesses maintain a healthy cash position to sustain.
            </div>

            <div className="para">
              Remember, the outflow part of cash flow is never a problem; money will always run out of your business easily. Keeping the money coming in on a regular, sustained basis is the tricky part of cash flow management. Here are some of our tips to effectively manage and keep your cash flowing:
            </div>

            <div className="para">
              <b>Discounts</b>
              <span> - Offer an ‘early payment’ discount to your customers as a way for them to pay you quicker. An earlier payment into your account will allow you to collect cash quicker than your agreed payment terms with customers freeing you up to pay your day-to-day needs. While this practice may impact your profit margin, it may help your management of cash flow by incentivizing customers to make payments earlier than billing cycles typically require. Your company may also take advantage of this with suppliers and others that you owe, but be careful that your early payments of debt don’t leave you with a cash flow shortfall.</span>
            </div>

            <div className="para">
              <b>Collecting receivables</b>
              <span> - Take action and speed up payments by collecting receivables immediately. Avoid lengthy payment terms and produce Invoices that are ‘due immediately’ with ‘payment due’ no later than ‘14 days’ from the date of invoice issued. A member of your accounts team can then carry out ‘follow up’ communications with customers and monitor incoming payments.</span>
            </div>

            <div className="para">
              <b>Use cash flow management tools</b>
              <span> - In today’s digital climate, there is a wide variety of software tools available to manage, track and forecast your cash flow. If you happen to be using small business accounting software to manage your accounts you may already have the cash flow tools you need. Cloud-based accounting applications such as QuickBooks have built-in cash flow forecasting reports.</span>
            </div>

            <div className="para">
              <b>Plan, manage and forecast</b>
              <span> - Planning and managing is key for a positive cash flow. What do you expect your cash balance to be six months from now? This one question will transform the way you manage your business.</span>
            </div>

            <div className="para">
              <b>Avoid unnecessary expenditure</b>
              <span> - Part of your forecasting model should give you a strong view of the necessary expenses that are outgoing each month. Outside of the most essential purchases, try to minimise spending and eliminate costs that are not essential to your operation until you’ve reached a profitable position.</span>
            </div>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="How does Invoice Finance differ to Overdrafts?">
            <div className="para">
              Businesses typically gravitate towards traditional forms of lending such as banks, and overdrafts are one of the most well-known routes to finance available and frequently the option that business owners consider first. This is because they are quick and easy to set up if there’s no charge over freehold property. However, they must be formally arranged in advance to avoid a penalty.
            </div>

            <div className="para">
              Every business’s circumstance is different, and depending on that will determine whether you are more suited to an overdraft or invoice finance facility. By way of an example, if your business is growing at a fast pace and experiencing large volumes of orders, then invoice finance compliments that growth, as the method grows with your business. If you can’t keep up with the pace of unexpected growth and need to release cash quicker than customers take to pay you, then invoice finance is compatible for your business.
            </div>

            <div className="para">
              Once an overdraft is in place, it needs to be thoroughly monitored or the business will be at risk of severe charges. However, one of the main benefits of overdraft lending is that the bank only approaches the business periodically for management figures. In the majority of cases, overdraft lending is more cost effective than invoice finance on a like-for-like basis.
            </div>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="Disadvantages of Overdraft facilities">
            <div>Overdrafts can appear to be attractive to businesses, however, there are barriers to accessing overdrafts which cover several of the following factors:</div>
            <ul>
              <li>The bank can ask for the money back any time</li>
              <li>Extending the overdraft beyond the agreed limit can be costly at around 29% is common and sometimes impossible.</li>
              <li>Where it is permissible, many institutions require you to go through the entire application process again.</li>
              <li>Commercial overdrafts must sometimes be secured with collateral security (usually property or machinery)</li>
              <li>The bank’s lending criteria can be restrictive – many businesses with low credit scores or inconsistent trading history may struggle to obtain one.</li>
              <li>The overdraft will have to be negotiated if your business grows and is not guaranteed to be accepted.</li>
            </ul>
          </KnowledgeCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <KnowledgeCard title="Invoice Finance vs Credit Cards">
            <div className="para">
              Businesses may typically apply for a credit card based on the following advantages:
            </div>

            <div className="para">
              <div>Quick and easy application. When applying for a credit card, the provider will almost instantly tell you whether you have been approved.</div>
              <div>A credit limit and card is then issued within 1-3 working days.</div>
            </div>

            <div className="para">
              For startups, credit cards can be a great financial tool. Most credit cards offer a revolving facility meaning the business can borrow up to the limit, pay it off and then have access to the funds again. This can make paying for goods and services convenient, make staff work-related spending easier, help cash flow and improve credit ratings, without any need for collateral.
            </div>

            <div className="para">
              Based on the following disadvantages, businesses may defer from credit cards due to:
            </div>

            <div className="para">
              High Interest Rates - For banks and other card issuers, credit cards are decidedly risky due to customers often paying late or defaulting entirely. Therefore, issuers charge high interest rates to compensate for that risk.
            </div>

            <div className="para">
              Low limits - It is difficult to identify which credit cards will give any individual the best limit, as credit scoring processes are bespoke for each organisation and individual.Factors that can affect your borrowing amount can depend on your credit score, previous repayment history and outstanding debts.
            </div>
          </KnowledgeCard>

        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  .hero-section {
    width: 100%;
    height: 20vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 48px;
    font-weight: bold;
    line-height: 68px;
    background: #000000BB;

    .background-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url('/img/shutterstock_27584143.jpg') no-repeat;
      background-size: cover;
      z-index: -1;
    }
  }

  .main-section {
    padding: 30px 240px;
    font-size: 14px;
  }

  .divider-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .para {
    margin-bottom: 20px;
  }
`

export default KnowledgeBase
