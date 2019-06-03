import React from 'react';
import { Row, Col, CardBody } from 'reactstrap';
import { Sparklines, SparklinesCurve } from 'react-sparklines';

import { Card, CardTitle, PercentText } from '../../../../components/styled-components/Card';
import { P } from '../../../../components/styled-components/Typography';
import { TotalSummaryContainer } from '../../../../components/styled-components/Dashboard/BorrowerDashboard';

const SummaryWidget = ({isEmpty, data, invoicesFundedCount, invoicesUploadedCount}) => {

  const graphColor = isEmpty ? '#A5ACB5':"#5CA0F6";
  const emptyData = {
    averageRate: {
      value: 0,
      graph: [5, 10, 5, 20, 15],
    },
    altmanZScore: {
      value: 0,
      graph: [5, 10, 5, 20, 15],
    },
    overdueRate: {
      value: 0,
      graph: [5, 10, 5, 20, 15],
    },
  };
  const sparklineStyle = {
    minWidth: 50,
    maxWidth: 50,
    flexGrow: 1
  };

  const {averageRate, altmanZScore, overdueRate} = isEmpty ? emptyData : data;

  return (
    <Card>
      <Row>
        <Col xs={12} md={8} lg={12}>
          <CardBody>
            <CardTitle>Summary</CardTitle>
            <Row>
              <Col xs={6} md={6} lg={12} className="m-b-10">
                <Row>
                  <Col xs={{size: 12, order: 2}} lg={{size: 5, order: 1}}>
                    <P cool={isEmpty} className="m-b-0">Average Rate</P>
                  </Col>
                  <Col xs={{size: 12, order: 1}} lg={{size: 7, order: 2}}>
                    <div className="d-flex justify-content-start justify-content-lg-end m-b-10">
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
                  </Col>
                </Row>
              </Col>
              <Col xs={6} md={6} lg={12} className="m-b-10">
                <Row>
                  <Col xs={{size: 12, order: 2}} lg={{size: 5, order: 1}}>
                    <P cool={isEmpty} className="m-b-0">Altman Z-score</P>
                  </Col>
                  <Col xs={{size: 12, order: 1}} lg={{size: 7, order: 2}}>
                    <div className="d-flex justify-content-start justify-content-lg-end m-b-10">
                      <PercentText>
                        { altmanZScore.value.toLocaleString('en-US', {
                            minimumFractionDigits: 2
                          })
                        }
                      </PercentText>
                      <div className="m-l-10" style={sparklineStyle}>
                        <Sparklines
                          data={altmanZScore.graph}
                          limit={5}
                          width={27}
                          height={16}
                        >
                          <SparklinesCurve color={graphColor}  style={{strokeWidth: 1}}/>
                        </Sparklines>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={{size: 6, offset: 3}} md={{size: 6, offset: 0}} lg={12} className="m-b-0">
                <Row>
                  <Col xs={{size: 12, order: 2}} lg={{size: 5, order: 1}}>
                    <P cool={isEmpty} className="m-b-0">Overdue Rate</P>
                  </Col>
                  <Col xs={{size: 12, order: 1}} lg={{size: 7, order: 2}}>
                    <div className="d-flex justify-content-start justify-content-lg-end m-b-10">
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
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Col>
        <Col xs={12} md={4} lg={12}>
          <TotalSummaryContainer>
            <P cool={isEmpty}>Total invoices uploaded: {invoicesUploadedCount}</P>
            <P cool={isEmpty}>Total invoices funded: {invoicesFundedCount}</P>
          </TotalSummaryContainer>
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryWidget;
