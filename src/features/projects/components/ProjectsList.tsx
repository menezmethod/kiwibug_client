import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from 'axios';
import { Project } from '../types';
import { Button, Paper, styled } from '@mui/material';

// import { DeleteProject } from './DeleteProject';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});
const ProjectButtons = styled(Button)({
  padding: 10,
  margin: 6,
});

export const ProjectsList = () => {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    axios.get<Project[]>('http://localhost:8080/projects').then((response: AxiosResponse) => {
      setProjectData(response.data);
    });
  }, [selectionModel]);

  // if (usersQuery.isLoading) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  const handleDeleteProject = () => {
    console.log('Deleting: ' + selectionModel);
    axios.delete('http://localhost:8080/projects/' + selectionModel);
  };

  const handleEdit = () => {};

  const handleClose = () => {};

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
    <div style={{ height: '71vh', width: '100%' }}>
      <DataGrid
        rows={projectData}
        columns={projectColumns}
        pageSize={5}
        getRowId={(row) => row.projectId}
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
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <ControlButtons elevation={0}>
        <ProjectButtons onClick={handleEdit} variant="outlined" startIcon={<AccountTreeIcon />}>
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
    </div>
  );
};
