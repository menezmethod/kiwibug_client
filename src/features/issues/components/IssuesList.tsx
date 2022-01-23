import LoaderSuspense from '@/components/LoaderSuspense';
import { formatDateGrid } from '@/utils/format';
import { Container, Paper, styled } from '@mui/material';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { useIssues } from '../api/getIssues';
import AddIssue from './AddIssue';

const DataGridIssue = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
}));

export const IssuesList = () => {
  const issuesQuery = useIssues();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  if (!issuesQuery.data) return null;

  let issuesRows = issuesQuery?.data;

  if (issuesQuery.isLoading) {
    return <LoaderSuspense />;
  }

  const issueColumns = [
    {
      name: 'issueSummary',
      label: 'Issue Summary',
    },
    {
      name: 'identifiedDate',
      label: 'Identified Date',
      options: {
        customBodyRender: (value: any) => formatDateGrid(value),
      },
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'priority',
      label: 'Priority',
    },
    {
      name: 'targetResolutionDate',
      label: 'Target Resolution Date',
      options: {
        customBodyRender: (value: any) => formatDateGrid(value),
      },
    },
    {
      name: 'progress',
      label: 'Progress',
    },
    {
      name: 'actualResolutionDate',
      label: 'Actual Resolution Date',
      options: {
        customBodyRender: (value: any) => (value ? formatDateGrid(value) : ' '),
      },
    },
    {
      name: 'identifiedByEmployeeId',
      label: 'Identified By',
      options: {
        customBodyRender: (value: any) => value?.employeeName,
      },
    },
    {
      name: 'relatedProjectId',
      label: 'Project Name',
      options: {
        customBodyRender: (value: any) => value?.projectName,
      },
    },
    {
      name: 'assignedToEmployeeId',
      label: 'Assigned To',
      options: {
        customBodyRender: (value: any) => value?.employeeName,
      },
    },
    {
      name: 'resolutionSummary',
      label: 'Resolution Summary',
    },
  ];
  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
  };
  return (
    <Container maxWidth={false}>
      <AddIssue />
      {/* <EditIssue issueId={selectionModel.join()} /> */}
      {/* <DeleteIssue id={selectionModel.join()} /> */}

      <MUIDataTable title="Issues" data={issuesRows} columns={issueColumns} options={options} />
    </Container>
  );
};
