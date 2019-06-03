import React, { Fragment } from 'react';
import {
  VictoryLegend,
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryTooltip,
} from 'victory';
import { CardText, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";
import { countries } from 'meteor/populous:constants';

import { Card, CardTitle } from '../../../../components/styled-components/Card/index';
import { InputInvisible } from "../../../../components/styled-components/Inputs";
import { UnderLineDiv } from "../../../../components/styled-components/Divs";
import { P, Small } from '../../../../components/styled-components/Typography';


const initialState = {
  chartType: 'pie',
  currentCountry: '',
};

class InvestmentsByIndustries extends React.Component {
  state = { ...initialState };
  colors = [
    '#5a86c1',
    '#eba551',
    '#63c97f',
    '#d67171',
    '#9d69b4',
    '#eed64a',
    '#56b5c2',
    '#df8664',
    '#a6dd59',
    '#b56db3',
    '#6b60b5',
    '#d7ed4a',
    '#cb6982',
    '#62cd60',
    '#58c3b1',
    '#c26b9e',
    '#5b9bc5',
    '#7ed25a',
    '#8360b5',
    '#58c192',
    '#5f6cb4',
  ];

  setChartsType = (chartType) => {
    this.setState({ chartType });
  };

  isSicDataAvailable() {
    const { sicStatistic, } = this.props;
    const { currentCountry, } = this.state;


    return !!(sicStatistic && Object.keys(sicStatistic).length && currentCountry);
  }

  generateGraphData() {
    const { sicStatistic } = this.props;
    const { currentCountry, } = this.state;

    const graphData = {
      legend: [],
      graph: [],
    };


    if (this.isSicDataAvailable() && currentCountry) {
      const { sections, totalCount } = sicStatistic[currentCountry];

      sections.forEach(({ sectionDescription, count }, sectionIndex) => {
        const color = this.colors[sectionIndex % this.colors.length];

        graphData.graph.push({
          x: sectionDescription,
          y: ((count / totalCount) * 100),
          y0: 0,
          fill: color,
        });
        graphData.legend.push(
          {
            name: sectionDescription,
            symbol: {
              fill: color,
              type: "square"
            }
          }
        );
      })
    }

    return graphData;
  }

  getCountriesForSelect() {
    const { sicStatistic } = this.props;

    if (this.isSicDataAvailable()) {
      return countries.filter(
        ({ key }) => sicStatistic.hasOwnProperty(key)
      )
    }

    return [];
  }


  updateCurrentCountry = ({target:{value}}) => {
    this.setState({currentCountry: value});
  };

  render() {
    const { chartType, currentCountry, } = this.state;
    const { currentWallet } = this.props;
    const availableCountries = this.getCountriesForSelect();
    const { legend, graph } = this.generateGraphData();

    const hasData = this.isSicDataAvailable();

    return (
      <Card>
        <CardBody>
          <CardTitle className="card-title-bold">
            Investments by industries {hasData && <b className="p-l-10 normal-text">- {currentWallet.title}</b>}
          </CardTitle>
          <div className="funds-switch">
            <div onClick={() => this.setChartsType('pie')} className="m-r-20">
              <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                  <g id="dashboard-i-dt" transform="translate(-490.000000, -654.000000)" strokeWidth="2"
                     stroke={`#${chartType !== 'pie' ? 'A5ACB5' : '5ba0f6'}`}>
                    <g id="industries" transform="translate(128.000000, 634.000000)">
                      <g id="pie" transform="translate(30.000000, 20.000000)">
                        <g id="switch-icons" transform="translate(332.000000, 0.000000)">
                          <g id="Page-1">
                            <path
                              d="M13,17 L24,17 C24,23.075 19.075,28 13,28 C6.925,28 2,23.075 2,17 C2,10.925 6.925,6 13,6 L13,17 Z"
                              id="Stroke-1"/>
                            <path d="M17,13 L17,2 C23.075,2 28,6.925 28,13 L17,13 Z" id="Stroke-3"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div className="m-r-15" onClick={() => this.setChartsType('bars')}>
              <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="dashboard-i-dt" transform="translate(-542.000000, -654.000000)" strokeWidth="2"
                     stroke={`#${chartType === 'pie' ? 'A5ACB5' : '5ba0f6'}`}>
                    <g id="industries" transform="translate(128.000000, 634.000000)">
                      <g id="pie" transform="translate(30.000000, 20.000000)">
                        <g id="switch-icons" transform="translate(332.000000, 0.000000)">
                          <g id="Page-1" transform="translate(52.000000, 0.000000)">
                            <polygon id="Stroke-1" points="2 8 28 8 28 2 2 2"/>
                            <polygon id="Stroke-3" points="2 18 18 18 18 12 2 12"/>
                            <polygon id="Stroke-4" points="2 28 13 28 13 22 2 22"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          { hasData && <div className="p-b-20">
            <UnderLineDiv heightAuto className="d-inline-block">
              <InputInvisible type="select" value={currentCountry}
                              onChange={this.updateCurrentCountry}
                              style={{
                                fontSize: 14,
                                color: '#636466',
                                height: 'auto',
                              }}>
                {availableCountries.map(
                  country => (
                    <option value={country.key} key={country.key}>
                      {country.name}
                    </option>
                  )
                )}
              </InputInvisible>
            </UnderLineDiv>
          </div>}
          {chartType === 'pie' &&
          <Fragment>
            {!hasData ?
              <div className="text-center m-t-30">
                <img src="/img/pie-chart.png" className="m-b-20" height="200" />
                <P cool>
                  Wait for updates here as soon as you <Link to="/market">buy the first invoice</Link>
                </P>
              </div>
            : <div className="m-t-30">
                <VictoryChart
                  containerComponent={<VictoryVoronoiContainer/>}
                  style={{ fontFamily: 'PT Sans' }}
                  padding={{top: 0, bottom: 120, left: 50, right: 50}}
                  width={300}
                  height={300}
                >
                  <VictoryPie
                    standalone={false}
                    data={graph}
                    innerRadius={50}
                    padAngle={1}
                    labels={() => null}
                  />
                  <VictoryLegend
                    standalone={false}
                    itemsPerRow={1}
                    orientation="horizontal"
                    gutter={35}
                    data={legend}
                    style={{
                      labels: { fontSize: 12, fill: '#636466' },
                    }}
                    y={200}
                  />
                  <VictoryAxis style={{ axis: { display: 'none' }, tickLabels: { display: 'none' } }} />
                </VictoryChart>
              </div>
            }
          </Fragment>
        }

        {chartType === 'bars' &&
          <Fragment>
            {!hasData ?
              <div className="text-center m-t-30">
                <img src="/img/img-graph-bars.png" className="m-b-20" height="200" />
                <P cool>
                  Wait for updates here as soon as you <Link to="/market">buy the first invoice</Link>
                </P>
              </div>
            : <div className="m-t-30">
                <VictoryChart
                  containerComponent={<VictoryVoronoiContainer/>}
                  style={{ fontFamily: 'PT Sans' }}
                  padding={{top: 0, bottom: 150, left: 30, right: 30}}
                  width={300}
                  height={300}
                  domainPadding={20}
                >
                  <VictoryBar horizontal
                    standalone={false}
                    style={{ labels: { fill: "#A5ACB5" } }}
                    data={graph}
                    labelComponent={
                      <VictoryTooltip
                        cornerRadius={5}
                        pointerLength={5}
                        flyoutStyle={{
                          fill: '#29405e',
                          stroke: 'transparent',
                        }}
                        orientation="top"
                        text={(d) => d.y}
                        dx={-10}
                        dy={10}
                        style={{ fontSize: 10, fill: 'white', strokeWidth: 1 }}
                      />
                    }
                  />
                  <VictoryLegend
                    standalone={false}
                    itemsPerRow={1}
                    orientation="horizontal"
                    gutter={35}
                    data={legend}
                    style={{
                      labels: { fontSize: 12, fill: '#636466' },
                    }}
                    y={200}
                  />
                  <VictoryAxis
                    tickValues={[0, 25, 50, 75, 100]}
                    style={{
                      axis: { stroke: '#e1e5eb' },
                      grid: { stroke: '#e1e5eb' },
                      tickLabels: { fontSize: 12, fill: '#a5acb5' },
                    }}
                  />
                </VictoryChart>
              </div>
            }
          </Fragment>
          }
        </CardBody>
      </Card>
    );
  }

  componentDidMount() {
    this.props.updateSicStatistic();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sicStatistic) {
      this.setState({ currentCountry: Object.keys(nextProps.sicStatistic)[0] })
    }
  }
}

export default InvestmentsByIndustries;
