import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BugReportIcon from '@mui/icons-material/BugReport';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from 'axios';
import { Issue } from '../types';
import { Button, Paper, styled } from '@mui/material';


// import { DeleteIssue } from './DeleteIssue';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});
const IssueButtons = styled(Button)({
  padding: 10,
  margin: 6,
});

export const IssuesList = () => {
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    axios.get<Issue[]>('http://localhost:8080/issues').then((response: AxiosResponse) => {
      setIssueData(response.data);
    });
  }, [selectionModel]);

  // if (issuesQuery.isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleDeleteIssue = () => {
    console.log('Deleting: ' + selectionModel);
    axios.delete('http://localhost:8080/issues/' + selectionModel);
  };

  const handleEdit = () => {};

  const handleClose = () => {};

  const handleSubmit = () => {};

  function getIdentifiedBy(params: { row: { identifiedByEmployeeId: { employeeName: any } } }) {
    return `${params.row.identifiedByEmployeeId.employeeName}`;
  }
  function getAssignedTo(params: { row: { assignedToEmployeeId: { employeeName: any } } }) {
    return `${params.row.assignedToEmployeeId.employeeName}`;
  }
  function getAssignedProject(params: { row: { assignedToEmployeeId: { assignedProjects: { projectName: any; }; }; }; }) {
    return `${params.row.assignedToEmployeeId.assignedProjects.projectName}`;
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
      width: 175,
    },
    {
      field: 'identifiedByEmployeeId',
      headerName: 'Identified By',
      width: 160,
      valueGetter: getIdentifiedBy,
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
      valueGetter: getAssignedTo,
    },
  ];
  return (
    <div style={{ height: '71vh', width: '100%' }}>
      <DataGrid
        rows={issueData}
        columns={issueColumns}
        pageSize={5}
        getRowId={(row) => row.issuesId}
        rowsPerPageOptions={[5]}
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
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <ControlButtons elevation={0}>
        <IssueButtons onClick={handleEdit} variant="outlined" startIcon={<BugReportIcon />}>
          Add Issue
        </IssueButtons>
        {selectionModel && selectionModel.length ? (
          <IssueButtons onClick={handleSubmit} variant="outlined" startIcon={<EditIcon />}>
            Edit
          </IssueButtons>
        ) : (
          ''
        )}

        {selectionModel && selectionModel.length ? (
          <IssueButtons
            onClick={handleDeleteIssue}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </IssueButtons>
        ) : (
          ''
        )}
      </ControlButtons>
    </div>
  );
};
