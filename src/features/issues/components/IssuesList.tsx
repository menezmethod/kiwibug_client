import LoaderSuspense from '@/components/LoaderSuspense';
import { formatDateGrid } from '@/utils/format';
import { Grid, Paper, styled } from '@mui/material';
import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useIssues } from '../api/getIssues';
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

export const IssuesList = () => {
  const issuesQuery = useIssues();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  if (!issuesQuery.data) return null;

  let issuesRows = issuesQuery?.data;

  if (issuesQuery.isLoading) {
    return <LoaderSuspense />;
  }

  function identifiedDateFormat(params: { row: { identifiedDate: number } }) {
    return formatDateGrid(params.row.identifiedDate);
  }

  function targetResolutionDateFormat(params: { row: { targetResolutionDate: number } }) {
    return formatDateGrid(params.row.targetResolutionDate);
  }

  function actualResolutionDateFormat(params: { row: { actualResolutionDate: number } }) {
    if (params.row.actualResolutionDate) {
      return formatDateGrid(params.row.actualResolutionDate);
    }
  }

  function getAssignedToEmployeeId(params: {
    row: { assignedToEmployeeId: { employeeName: string } | null };
  }) {
    if (params.row.assignedToEmployeeId === null) {
      return 'Unassigned';
    } else {
      return params.row.assignedToEmployeeId.employeeName;
    }
  }

  function getIdentifiedByEmployeeId(params: {
    row: { identifiedByEmployeeId: { employeeName: string } | null };
  }) {
    if (params.row.identifiedByEmployeeId === null) {
      return 'Unidentified';
    } else {
      return params.row.identifiedByEmployeeId.employeeName;
    }
  }

  function getAssignedProject(params: {
    row: { relatedProjectId: { projectName: string } | null };
  }) {
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
    },
    {
      field: 'identifiedDate',
      headerName: 'Identified Date',
      type: 'date',
      valueGetter: identifiedDateFormat,
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: 'priority',
      headerName: 'Priority',
    },
    {
      field: 'targetResolutionDate',
      headerName: 'Target Resolution Date',
      type: 'date',
      valueGetter: targetResolutionDateFormat,
    },
    {
      field: 'progress',
      headerName: 'Progress',
    },
    {
      field: 'actualResolutionDate',
      headerName: 'Actual Resolution Date',
      type: 'date',
      valueGetter: actualResolutionDateFormat,
    },
    {
      field: 'identifiedByEmployeeId',
      headerName: 'Identified By',
      valueGetter: getIdentifiedByEmployeeId,
    },
    {
      field: 'assignedProjects',
      headerName: 'Project Name',
      valueGetter: getAssignedProject,
    },
    {
      field: 'assignedToEmployeeId',
      headerName: 'Assigned To',
      valueGetter: getAssignedToEmployeeId,
    },
    {
      field: 'resolutionSummary',
      headerName: 'Resolution Summary',
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
