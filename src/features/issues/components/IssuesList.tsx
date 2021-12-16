import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BugReportIcon from '@mui/icons-material/BugReport';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from 'axios';
import { Issue } from '../types';
import { Box, Button, Modal, Paper, styled } from '@mui/material';

import IssueDataService from '../api/IssueService';
import IssueForm from './IssueForm';
import React from 'react';

// import { DeleteIssue } from './DeleteIssue';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});
const IssueButtons = styled(Button)({
  padding: 10,
  margin: 6,
});

const userModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};

const DataGridIssue = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});

export const IssuesList = () => {
  const [open, setOpen] = React.useState(false);
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    retrieveIssues();
    console.log(selectionModel);
  }, [selectionModel]);

  const retrieveIssues = () => {
    IssueDataService.getAll()
      .then((response: any) => {
        setIssueData(response.data);
        // console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // if (issuesQuery.isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleDeleteIssue = () => {
    console.log('Deleting: ' + selectionModel);
    IssueDataService.remove(selectionModel)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleEdit = () => {};

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {};

  function getIdentifiedBy(params: { row: { identifiedByEmployeeId: { employeeName: any } } }) {
    return `${params.row.identifiedByEmployeeId.employeeName}`;
  }
  function getAssignedTo(params: { row: { assignedToEmployeeId: { employeeName: any } } }) {
    return `${params.row.assignedToEmployeeId.employeeName}`;
  }
  function getAssignedProject(params: {
    row: { assignedToEmployeeId: { assignedProjects: { projectName: any } } };
  }) {
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
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGridIssue
        rows={issueData}
        columns={issueColumns}
        pageSize={5}
        getRowId={(row: { issuesId: any }) => row.issuesId}
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
        onSelectionModelChange={(newSelectionModel: React.SetStateAction<GridSelectionModel>) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <ControlButtons elevation={0}>
        <IssueButtons onClick={handleOpen} variant="outlined" startIcon={<BugReportIcon />}>
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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={userModalStyle}>
          <IssueForm />
        </Box>
      </Modal>
    </div>
  );
};
