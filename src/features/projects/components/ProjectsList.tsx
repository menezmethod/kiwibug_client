import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Project } from '../types';
import { Box, Button, CircularProgress, Modal, Paper, styled } from '@mui/material';
import { formatDataGridDate } from '@/utils/format';

import React from 'react';
import dayjs from 'dayjs';
import AddProject from './AddProject';
// import { EditProject } from '../api/EditProject';
// import { EdeleteProject } from '../api/DeleteProject';
import { useProjects } from '../api/getProjects';
import { QueryClientProvider } from 'react-query';

// import { DeleteProject } from './DeleteProject';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});

const DataGridProject = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});
type ApiResponse = { data: { projectName: string } };

export const ProjectsList = () => {
  const projectsQuery = useProjects();
  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  if (projectsQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  // const handleDeleteProject = () => {
  //   console.log('Deleting: ' + selectionModel);
  //   ProjectDataService.remove(selectionModel)
  //     .then((response: any) => {
  //       console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };

  // const handleEdit = () => {};

  // const handleOpen = () => setOpen(true);

  // const handleClose = () => setOpen(false);

  // const handleSubmit = () => {};

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
  

  if (!projectsQuery.data) return null;


  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGridProject
        pageSize={10}
        rows={projectsQuery.data?.data}
        columns={projectColumns}
        getRowId={(row: { projectId: any }) => row.projectId}
        rowsPerPageOptions={[10, 20]}
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
        "Add Project"
        {/* <AddProject /> */}
        {selectionModel && selectionModel.length ? (
          // <ProjectButtons onClick={handleSubmit} variant="outlined" startIcon={<EditIcon />}>
          //   Edit
          // </ProjectButtons>
          // <EditProject />
          "yo"
        ) : (
          ''
        )}

        {selectionModel && selectionModel.length ? (
          // <ProjectButtons
          //   onClick={handleDeleteProject}
          //   color="error"
          //   variant="contained"
          //   startIcon={<DeleteIcon />}
          // >
          //   Delete
          // </ProjectButtons>
          // <DeleteProject />
          "yo"
        ) : (
          ''
        )}
      </ControlButtons>
    </div>
  );
};
