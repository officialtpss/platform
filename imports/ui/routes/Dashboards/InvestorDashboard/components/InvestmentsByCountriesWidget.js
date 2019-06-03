import React from 'react';
import { VictoryChart, VictoryLegend, VictoryBar, VictoryLabel } from 'victory';
import { CardText, CardBody } from 'reactstrap';

import { Card, CardTitle } from '../../../../components/styled-components/Card';

const InvestmentsByCountriesWidget = () => {
  return (
    <Card className="m-t-10 m-b-30">
      <CardBody>
        <CardTitle>Investments By Industries <b className="p-l-10" style={{'textTransform':'initial'}}>- USDp</b></CardTitle>
        <div className="text-center">
          <svg width={240} height={340}>
            <VictoryBar horizontal
              standalone={false}
              width={240} height={220}
              labels={(d) => d.y}
              style={{ labels: { fill: "#A5ACB5" } }}
              labelComponent={<VictoryLabel dx={0}/>}
              data={[
                { x: 'Owning of cereals', y: 600, y0: 0, fill:'#5A86C1' },
                { x: 'Owning of tobacco', y: 200, y0: 0, fill:'#77C58C' },
                { x: 'Owning of rice', y: 120, y0: 0, fill:'#EBA551' },
                { x: 'Owning of something else', y: 80, y0: 0, fill:'#D67171' }
              ]}
              innerRadius={100}
              padAngle={1}
              colorScale={["#5A86C1", "#77C58C", "#EBA551", "#D67171"]}
            />
            <VictoryLegend
              standalone={false}
              x={0} y={220}
              itemsPerRow={1}
              orientation="horizontal"
              gutter={35}
              data={[
                { name: "Owning of cereals", symbol: { fill: "#5A86C1", type: "square" } },
                { name: "Owning of tobacco", symbol: { fill: "#77C58C", type: "square" } },
                { name: "Owning of rice", symbol: { fill: "#EBA551", type: "square" } },
                { name: "Owning of something else", symbol: { fill: "#D67171", type: "square" } }
              ]}
            />
          </svg>
        </div>
      </CardBody>
    </Card>
  );
};

export default InvestmentsByCountriesWidget;
