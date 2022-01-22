import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useIssues } from '@/features/issues/api/getIssues';
import { useUsers } from '@/features/users/api/getUsers';
import { Chart, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { BarSeries } from '@devexpress/dx-react-chart';

import dayjs from 'dayjs';
import { Paper } from '@mui/material';

export default function ResolvedByMonth() {
  const issuesQuery = useIssues();
  const usersQuery = useUsers();

  let issuesData = issuesQuery?.data;
  let usersData = usersQuery?.data;

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
          //   console.log(days);
          return diffInTimePerIssue;
        });
        // console.log(obj2);
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
      <Paper>
        {' '}
        <Chart data={chartData} rotated>
          <ArgumentAxis />
          <ValueAxis max={500} />
          <BarSeries valueField="days" argumentField="name" />
          <Title text="Average Days To Resolve Issues" />
        </Chart>
      </Paper>
    </ContentLayout>
  );
}
