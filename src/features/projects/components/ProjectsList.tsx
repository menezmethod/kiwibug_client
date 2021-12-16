import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from 'axios';
import { Project } from '../types';
import { Box, Button, Modal, Paper, styled } from '@mui/material';

import ProjectDataService from '../api/ProjectService';
import ProjectForm from './ProjectForm';
import React from 'react';

// import { DeleteProject } from './DeleteProject';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});

const ProjectButtons = styled(Button)({
  padding: 10,
  margin: 6,
});

const DataGridProject = styled(DataGrid)({
  border:'0',
  marginTop:'-4vh'
});

const userModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  // overflow: 'scroll',
  p: 4,
};

export const ProjectsList = () => {
  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    retrieveProjects();
    console.log(selectionModel);

  }, [selectionModel]);

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response: any) => {
        setProjectData(response.data);
        // console.log(response.data);

      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // if (usersQuery.isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleDeleteProject = () => {
    console.log('Deleting: ' + selectionModel);
    ProjectDataService.remove(selectionModel)
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

  const projectColumns = [
    {
      field: 'projectName',
      headerName: 'Name',
      width: 280,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 280,
    },
    {
      field: 'targetEndDate',
      headerName: 'Target End Date',
      width: 280,
    },
    {
      field: 'actualEndDate',
      headerName: 'Actual End Date',
      width: 280,
    },
  ];
  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGridProject
        rows={projectData}
        columns={projectColumns}
        pageSize={5}
        getRowId={(row: { projectId: any; }) => row.projectId}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: 'projectName',
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
        <ProjectButtons onClick={handleOpen} variant="outlined" startIcon={<AccountTreeIcon />}>
          Add Project
        </ProjectButtons>
        {selectionModel && selectionModel.length ? (
          <ProjectButtons onClick={handleSubmit} variant="outlined" startIcon={<EditIcon />}>
            Edit
          </ProjectButtons>
        ) : (
          ''
        )}

        {selectionModel && selectionModel.length ? (
          <ProjectButtons
            onClick={handleDeleteProject}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </ProjectButtons>
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
          <ProjectForm />
        </Box>
      </Modal>
    </div>
  );
};
