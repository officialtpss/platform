import React from 'react';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryArea, VictoryVoronoiContainer, VictoryTooltip, VictoryLabel, Flyout } from 'victory';

import { P } from '../../../../components/styled-components/Typography/index';


const CirclePoint = (props) => {
  const {x, y} = props;
  const newY = y + 8;

  return (
    <g>
      <circle cx={x} cy={newY} r="10" stroke="rgba(63,119,191,.3)" strokeWidth="1" fill="none"/>
      <circle cx={x} cy={newY} r="4" stroke="#3F77BF" strokeWidth="2" fill="#fff"/>
      <circle cx={x} cy={newY} r="2" strokeWidth="0" fill="#3F77BF"/>
      <line x1={x} y1={newY + 6} x2={x} y2={247} strokeWidth="1" stroke="#E1E5EB"/>
    </g>
  );
};

const CustomFlyout = (props) => {

  return (
    <g>
      <Flyout {...props} y={props.y - 3} width={30} height={20}/>
      <CirclePoint {...props} />
    </g>
  );
};

const CustomLabel = (props) => {
  const {x, y, datum, data} = props;

  if (data[data.length - 1] == datum) {
    return (
      <g>
        <circle cx={x + 5} cy={y + 10} r="15" strokeWidth="1" stroke="#3F77BF" fill="#fff"/>
        <VictoryLabel
          textAnchor="middle" verticalAnchor="middle"
          x={x + 5} y={y + 10}
          style={{fill: '#3F77BF', fontFamily: 'PT Sans', fontSize: 12}}
          text={datum._y}
        />
      </g>
    );
  }

  if (datum.isValid) {
    return (
      <VictoryTooltip
        {...props}
        flyoutComponent={<CustomFlyout />}
        cornerRadius={10}
        pointerLength={5}
        flyoutStyle={{
          strokeWidth: 1,
          stroke: 'rgba(67,68,69,.15)',
          fill: '#fff'
        }}
      />
    );
  } else {
    return (
      <VictoryTooltip
        {...props}
        text="There is no data for this period"
        cornerRadius={5}
        pointerLength={5}
        style={{stroke: '#fff', fontSize: 10, fill: 'rgb(255, 255, 255)', strokeWidth: 0}}
        flyoutStyle={{fill: '#29405e', strokeWidth: 0, padding: 0}}
      />
    );
  }
};

const ZScoreModal = (props) => {
  const { isOpen, toggle, borrower } = props;
  const safeBorder = 2.6,
    bankruptBorder = 1.1;

  const styles = {
    parent: {
      fontFamily: 'PT Sans'
    },
    axisDate: {
      axis: {stroke: '#E1E5EB', strokeWidth: 1},
      ticks: {size: 0},
      tickLabels: {fill: '#A5ACB5', fontFamily: 'PT Sans', fontSize: 12}
    },
    axisValue: {
      axis: {strokeWidth: 0},
      ticks: {size: 0},
      tickLabels: {fill: (t) => t == 0 ? '#A5ACB5' : '#3F77BF', fontFamily: 'PT Sans', fontSize: 12}
    },
    gridXLine: {
      data: {stroke: '#E1E5EB', strokeWidth: 1}
    },
    gridArea: {
      bankrupt: {
        data: {fill: '#C57777', fillOpacity: 0.08, strokeWidth: 0}
      },
      grey: {
        data: {fill: '#C0C5CC', fillOpacity: 0.08, strokeWidth: 0}
      },
      safe: {
        data: {fill: '#77C58C', fillOpacity: 0.08, strokeWidth: 0}
      },
      noData: {
        data: {fill: '#90959C', fillOpacity: 0.08, strokeWidth: 0}
      }
    },
    line: {
      data: {stroke: "#3F77BF"},
      labels: {
        fill: (d) => d.y >= safeBorder ? '#77C58C' : d.y >= bankruptBorder ? '#C0C5CC' : '#C57777',
        fontSize: 10,
        fontFamily: 'PT Sans'
      }
    }
  };

  let scoreData = [];
  let year = moment().year();
  let lastValidScore = -1;
  for (let i = 0; i < 5; i++) {
    let yVal = lastValidScore;
    let isScoreValid = false;
    if (borrower.zscore.hasOwnProperty(year)) {
      yVal = parseFloat(borrower.zscore[year]);
      if (yVal < 0) yVal = 0;
      lastValidScore = yVal;
      isScoreValid = true;
    } else {
      if (lastValidScore < 0) {
        year--;
        continue;
      }
    }
    scoreData.push({
      x: new Date(parseInt(year), 1, 1),
      y: yVal,
      isValid: isScoreValid
    });
    year--;
  }
  const xTickValues = scoreData.map((v) => v.x);
  const minDate = moment.min(xTickValues.map((d) => moment(d))).subtract(1, 'years').toDate();
  const maxDate = moment.max(xTickValues.map((d) => moment(d))).add(1, 'years').toDate();

  const yValues = scoreData.map((v) => v.y);
  let minScore = Math.min(...yValues) - 1;
  minScore = minScore > 0 ? 0 : minScore;
  let maxScore = Math.max(...yValues) + 1;
  maxScore = maxScore < 5 ? 5 : maxScore;
  const yDomain = [minScore, maxScore];

  let currentZone = null;
  const currentValue = (scoreData.length && scoreData[0].y) || undefined;
  if (currentValue < bankruptBorder) {
    currentZone = 'bankrupt';
  } else if(currentValue < safeBorder) {
    currentZone = 'grey';
  } else if(currentValue) {
    currentZone = 'safe';
  }

  return (
    <Modal isOpen={isOpen} toggle={()=>toggle()} className="custom modal-lg">
      <ModalHeader toggle={()=>toggle()}>Altman z-score
        of {borrower.companyName && borrower.companyName !== "" ? borrower.companyName : borrower.fullName()}</ModalHeader>
      <ModalBody style={{height: 500}}>
        <div>
          <VictoryChart
            padding={{top: 10, bottom: 10, left: 40, right: 30}}
            width={700}
            containerComponent={
              <VictoryVoronoiContainer />
            }
            style={styles.parent}
          >

            {/* time axis */}
            <VictoryAxis
              scale="time"
              standalone={false}
              style={styles.axisDate}
              tickValues={xTickValues}
              tickFormat={
                (x) => {
                  return moment(x).format('YYYY');
                }
              }
            />

            {/* y axis */}
            <VictoryAxis dependentAxis
                         scale="linear"
                         domain={yDomain}
                         standalone={false}
                         orientation="left"
                         style={styles.axisValue}
                         tickValues={[0, bankruptBorder, safeBorder, maxScore]}
            />

            {/* color area */}
            <VictoryArea
              standalone={false}
              data={[
                {x: minDate, y: 0, y0: bankruptBorder},
                {x: maxDate, y: 0, y0: bankruptBorder},
              ]}
              style={styles.gridArea.bankrupt}
            />
            <VictoryLabel
              textAnchor="start" verticalAnchor="middle"
              x={60} y={280 - (1.1 / 2) * 270 / maxScore}
              style={{fill: styles.gridArea.bankrupt.data.fill, fontFamily: 'PT Sans', fontSize: 10}}
              text="BANKRUPT ZONE"
            />

            <VictoryArea
              standalone={false}
              data={[
                {x: minDate, y: bankruptBorder, y0: safeBorder},
                {x: maxDate, y: bankruptBorder, y0: safeBorder},
              ]}
              style={styles.gridArea.grey}
            />
            <VictoryLabel
              textAnchor="start" verticalAnchor="middle"
              x={60} y={270 - (2.6 + 1.1) / 2 * 260 / maxScore}
              style={{fill: styles.gridArea.grey.data.fill, fontFamily: 'PT Sans', fontSize: 10}}
              text="GREY ZONE"
            />

            <VictoryArea
              standalone={false}
              data={[
                {x: minDate, y: safeBorder, y0: maxScore},
                {x: maxDate, y: safeBorder, y0: maxScore},
              ]}
              style={styles.gridArea.safe}
            />
            <VictoryLabel
              textAnchor="start" verticalAnchor="middle"
              x={60} y={250 - (maxScore + 2.6) / 2 * 250 / maxScore}
              style={{fill: styles.gridArea.safe.data.fill, fontFamily: 'PT Sans', fontSize: 10}}
              text="SAFE ZONE"
            />

            {/* separate line */}
            <VictoryLine
              data={[
                {x: minDate, y: bankruptBorder},
                {x: maxDate, y: bankruptBorder}
              ]}
              domain={{
                x: [minDate, maxDate],
                y: yDomain
              }}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.gridXLine}
            />

            <VictoryLine
              data={[
                {x: minDate, y: safeBorder},
                {x: maxDate, y: safeBorder}
              ]}
              domain={{
                x: [minDate, maxDate],
                y: yDomain
              }}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.gridXLine}
            />

            {/* invalid values */
              scoreData.map((data, i) => {
                if (!data.isValid) {
                  const fromDate = moment(data.x).subtract(6, 'months').toDate();
                  const toDate = moment(data.x).add(6, 'months').toDate();
                  return (
                    <VictoryArea
                      standalone={false}
                      data={[
                        {x: fromDate, y: 0, y0: maxScore},
                        {x: toDate, y: 0, y0: maxScore},
                      ]}
                      style={styles.gridArea.noData}
                      key={i}
                    />
                  );
                }
              })
            }

            {/* graph */}
            <VictoryLine
              data={scoreData}
              domain={{
                x: [minDate, maxDate],
                y: yDomain
              }}
              interpolation="natural"
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.line}
              labels={(d) => d.y}
              labelComponent={
                <CustomLabel />
              }
            />
          </VictoryChart>
        </div>

        {currentZone === 'bankrupt' &&
          <P className='p-l-40'>
            This company is currently in the bankrupt zone, which means that it has a high probability of going insolvent.
          </P>
        }
        {currentZone === 'grey' &&
        <P className='p-l-40'>
          This company is currently in the grey zone, which means that it has a medium probability of going insolvent.
        </P>
        }
        {currentZone === 'safe' &&
        <P className='p-l-40'>
          This company is currently in the safe zone, which means that it has a low probability of going insolvent.
        </P>
        }
      </ModalBody>
    </Modal>
  );
};

export default ZScoreModal;
