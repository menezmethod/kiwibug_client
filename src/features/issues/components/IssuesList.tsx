import { Box, CircularProgress, Grid, Paper, styled } from '@mui/material';
import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

import { useIssues } from '../api/getIssues';
import { Issue } from '../types';
import AddIssue from './AddIssue';
import { DeleteIssue } from './DeleteIssue';
import EditIssue from './EditIssue';

const DataGridIssue = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
}));

type EditIssueProps = {
  issueId: string;
};

export const IssuesList = () => {
  const issuesQuery = useIssues();
  const [open, setOpen] = React.useState(false);
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  if (!issuesQuery.data) return null;

  let issuesRows = issuesQuery.data?.data;

  if (issuesQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  function getAssignedToEmployeeId(params: { row: { assignedToEmployeeId: { employeeName: string; } | null; }; }) {
    if (params.row.assignedToEmployeeId === null) {
      return 'Unassigned';
    } else {
      return params.row.assignedToEmployeeId.employeeName;
    }
  }

  function getIdentifiedByEmployeeId(params: { row: { identifiedByEmployeeId: { employeeName: string; } | null; }; }) {
    if (params.row.identifiedByEmployeeId === null) {
      return 'Unidentified';
    } else {
      return params.row.identifiedByEmployeeId.employeeName;
    }
  }

  function getAssignedProject(params: { row: { relatedProjectId: { projectName: string; } | null; }; }) {
    if (params.row.relatedProjectId === null) {
      return 'Unassigned';
    } else {
      return params.row.relatedProjectId.projectName;
    }
  }

  const issueColumns = [
    {
      field: 'issueSummary',
      headerName: 'Issue Summary',
      width: 200,
    },
    {
      field: 'identifiedDate',
      headerName: 'Identified Date',
      type: 'date',
      width: 160,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 80,
    },
    {
      field: 'targetResolutionDate',
      headerName: 'Target Resolution Date',
      type: 'date',
      width: 175,
    },
    {
      field: 'progress',
      headerName: 'Progress',
      width: 120,
    },
    {
      field: 'actualResolutionDate',
      headerName: 'Actual Resolution Date',
      type: 'date',
      width: 175,
    },
    {
      field: 'identifiedByEmployeeId',
      headerName: 'Identified By',
      width: 160,
      valueGetter: getIdentifiedByEmployeeId,

    },
    {
      field: 'assignedProjects',
      headerName: 'Project Name',
      width: 160,
      valueGetter: getAssignedProject,
    },
    {
      field: 'assignedToEmployeeId',
      headerName: 'Assigned To',
      width: 160,
      valueGetter: getAssignedToEmployeeId,
    },    
    {
      field: 'resolutionSummary',
      headerName: 'Resolution Summary',
      width: 160,
    },
  ];
  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGridIssue
        rows={issuesRows}
        columns={issueColumns}
        pageSize={10}
        getRowId={(row: { issuesId: any }) => row.issuesId}
        rowsPerPageOptions={[10, 20]}
        components={{
          Toolbar: GridToolbar,
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: 'issueSummary',
                  operatorValue: 'contains',
                  value: '',
                },
              ],
            },
          },
        }}
        onSelectionModelChange={(newSelectionModel: React.SetStateAction<GridSelectionModel>) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <Grid container justifyContent="flex-end">
        <Item elevation={0}>
          <AddIssue />
          </Item>
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <EditIssue issueId={selectionModel.join()} />
            </Item>
        ) : (
          ''
        )}
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <DeleteIssue id={selectionModel.join()} />
            </Item>
        ) : (
          ''
        )}
      </Grid>
    </div>
  );
};
