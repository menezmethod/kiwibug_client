import { ContentLayout } from '@/components/Layout/ContentLayout';
import LoaderSuspense from '@/components/LoaderSuspense';
import { useIssues } from '@/features/issues/api/getIssues';
import { useUsers } from '@/features/users/api/getUsers';
import { Container, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { Chart, Format, Label, Series, Tooltip } from 'devextreme-react/chart';
import 'devextreme/dist/css/dx.material.blue.light.css';
import React from 'react';

export default function ResolvedByMonth() {
  const issuesQuery = useIssues();
  const usersQuery = useUsers();

  let issuesData = issuesQuery?.data;
  let usersData = usersQuery?.data;

  if (issuesQuery.isLoading || usersQuery.isLoading) {
    return <LoaderSuspense />;
  }

  const allNames = usersData?.map((a: any) => {
    return { name: a.employeeName };
  });

  let days: any[] = [];
  let issuesByUser: any[] = [];
  let chartData = [];

  issuesData?.map((a: any) => {
    allNames?.map((b: any) => {
      if (a.assignedToEmployeeId?.employeeName === b.name) {
        issuesByUser = issuesData?.filter(function (c: any) {
          return c.assignedToEmployeeId?.employeeName === b.name;
        });
        issuesByUser.map((d: any) => {
          let actualResolutionDate;
          if (d.actualResolutionDate === null) {
            actualResolutionDate = dayjs();
          } else {
            actualResolutionDate = dayjs(d.actualResolutionDate);
          }
          let diffInTimePerIssue = dayjs(d.createdOn).diff(actualResolutionDate, 'days');
          let dayLoad = {
            name: d.assignedToEmployeeId?.employeeName,
            issueId: d.issuesId,
            days: diffInTimePerIssue * -1,
          };
          days.push(dayLoad);
          return diffInTimePerIssue;
        });
        return issuesByUser;
      }
      return allNames;
    });
    return issuesData;
  });
  const daysFiltered = days.reduce((unique, o) => {
    if (
      !unique.some(
        (obj: any) => obj.name === o.name && obj.issueId === o.issueId && obj.days === o.days
      )
    ) {
      unique.push(o);
    }
    return unique;
  }, []);

  let totalDays: any[] = [];

  daysFiltered.forEach(function (d: any) {
    if (totalDays.hasOwnProperty(d.name)) {
      totalDays[d.name] = totalDays[d.name] + d.days;
    } else {
      totalDays[d.name] = d.days;
    }
  });

  for (var prop in totalDays) {
    chartData.push({ name: prop, days: Math.round(totalDays[prop] / issuesByUser.length) });
  }

  return (
    <ContentLayout title="Average Days To Resolve Issues">
      <Container maxWidth="lg">
        <Paper sx={{ padding: 3 }}>
          <Chart
            id="avg_days"
            title="Average Days To Resolve Issues"
            dataSource={chartData}
            rotated
          >
            <Label visible={true}>
              <Format type="fixedPoint" precision={0} />
            </Label>
            <Series
              showInLegend={false}
              valueField="days"
              argumentField="name"
              type="bar"
              color="#1976d2"
            />
            <Tooltip enabled={true} />
          </Chart>
          <br />
        </Paper>
      </Container>
    </ContentLayout>
  );
}
