import React from 'react';
import { Row, Col, CardBody } from 'reactstrap';
import { Sparklines, SparklinesCurve } from 'react-sparklines';

import { Card, CardTitle, PercentText } from '../../../../components/styled-components/Card';
import { P } from '../../../../components/styled-components/Typography';
import { TotalSummaryContainer } from '../../../../components/styled-components/Dashboard/InvestorDashboard';

const SummaryWidget = ({ isEmpty, data, className, ...props }) => {

  const graphColor = isEmpty ? '#A5ACB5' : "#5CA0F6";
  const {currentWallet} = props;
  //TODO: will be changed in future
  const emptyData = {
    averageRate: {
      value: 0,
      graph: [5, 10, 5, 20, 8, 15],
    },
    investmentProfitMargin: {
      value: 0,
      graph: [5, 10, 5, 20, 8, 15],
    },
    defaultRate: {
      value: 0,
      graph: [5, 10, 5, 20, 8, 15],
    },
    overdueRate: {
      value: 0,
      graph: [5, 10, 5, 20, 8, 15],
    },
  };

  const sparklineStyle = {
    minWidth: 50,
    maxWidth: 50,
    flexGrow: 1
  };

  const { averageRate, investmentProfitMargin, overdueRate, defaultRate } = isEmpty ? emptyData : data;

  return (
    <Card>
      <Row>
        <Col xs={12} md={8} lg={12}>
          <CardBody>
            <CardTitle>Summary</CardTitle>
            <Row className="m-b-20">
              <Col xs={6}>
                <div className="d-flex align-items-center">
                  <PercentText>
                    { averageRate.value.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 2
                      })
                    }
                  </PercentText>
                  <div className="m-l-10" style={sparklineStyle}>
                    <Sparklines
                      data={averageRate.graph}
                      limit={5}
                      width={27}
                      height={16}
                    >
                      <SparklinesCurve color={graphColor}  style={{strokeWidth: 1}}/>
                    </Sparklines>
                  </div>
                </div>
                <P cool={isEmpty} className="m-b-0">Average Rate of Interest</P>
              </Col>
              <Col xs={6}>
                <div className="d-flex align-items-center">
                  <PercentText>
                    { overdueRate.value.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 2
                      })
                    }
                  </PercentText>
                  <div className="m-l-10" style={sparklineStyle}>
                    <Sparklines
                      data={overdueRate.graph}
                      limit={5}
                      width={27}
                      height={16}
                    >
                      <SparklinesCurve color={graphColor}  style={{strokeWidth: 1}}/>
                    </Sparklines>
                  </div>
                </div>
                <P cool={isEmpty} className="m-b-0">Overdue Rate</P>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <div className="d-flex align-items-center">
                  <PercentText>
                    { investmentProfitMargin.value.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 2
                      })
                    }
                  </PercentText>
                  <div className="m-l-10" style={sparklineStyle}>
                    <Sparklines
                      data={investmentProfitMargin.graph}
                      limit={5}
                      width={27}
                      height={16}
                    >
                      <SparklinesCurve color={graphColor}  style={{strokeWidth: 1}}/>
                    </Sparklines>
                  </div>
                </div>
                <P cool={isEmpty} className="m-b-0">Investment Profit Margin</P>
              </Col>
              <Col xs={6}>
                <div className="d-flex align-items-center">
                  <PercentText>
                    { defaultRate.value.toLocaleString('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 2
                      })
                    }
                  </PercentText>
                  <div className="m-l-10" style={sparklineStyle}>
                    <Sparklines
                      data={defaultRate.graph}
                      limit={5}
                      width={27}
                      height={16}
                    >
                      <SparklinesCurve color={graphColor}  style={{strokeWidth: 1}}/>
                    </Sparklines>
                  </div>
                </div>
                <P cool={isEmpty} className="m-b-0">Default Rate</P>
              </Col>
            </Row>
          </CardBody>
        </Col>

        <Col xs={12} md={4} lg={12}>
          <TotalSummaryContainer>
            <div className="d-flex flex-md-column flex-lg-row">
              <P cool={isEmpty}>Investments:</P>
              <P cool={isEmpty}>{!isEmpty && currentWallet.title} 0.00</P>
            </div>
            <div className="d-flex flex-md-column flex-lg-row">
              <P cool={isEmpty}>Returns:</P>
              <P cool={isEmpty}>{currentWallet.title} 0.00</P>
            </div>
            <div className="d-flex flex-md-column flex-lg-row total">
              <P cool={isEmpty} green={!isEmpty}>Profit:</P>
              <P cool={isEmpty} green={!isEmpty}>{currentWallet.title} 0.00</P>
            </div>
          </TotalSummaryContainer>
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryWidget;
