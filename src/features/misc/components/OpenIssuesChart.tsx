import PieChart, {
    Connector,
    Export,
    Label,
    Legend,
    Series,
    SmallValuesGrouping
} from 'devextreme-react/pie-chart';
import 'devextreme/dist/css/dx.material.blue.light.css';
import React, { useEffect, useState } from 'react';

type OpenIssueProps = {
  name: string;
  value: number;
};

function formatLabel(arg: { argumentText: any; valueText: any }) {
  return `${arg.argumentText}: ${arg.valueText}%`;
}

export default function OpenIssuesChart({ data: dashboardPieChartData }: any) {
  const preData = [{ name: 'Loading..', value: 1 }];
  const [pieData, setPieData] = useState<OpenIssueProps[]>(preData);

  useEffect(() => {
    if (dashboardPieChartData.some((a: OpenIssueProps) => a.name !== undefined && a.value !== 0)) {
      setPieData(dashboardPieChartData);
    }
  }, [dashboardPieChartData]);

  return (
    <>
      <PieChart id="open_issues_by_project" dataSource={pieData} palette="Bright">
        <Series argumentField="name" valueField="value">
          <Label visible={true} customizeText={formatLabel} format="fixedPoint">
            <Connector visible={true} width={0.5} />
          </Label>
          <SmallValuesGrouping threshold={4.5} mode="smallValueThreshold" />
        </Series>
        <Legend horizontalAlignment="center" verticalAlignment="bottom" />
        <Export enabled={true} />
      </PieChart>
    </>
  );
}
