import {
  DataGrid,
  GridSelectionModel,
  GridToolbar,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Project } from '../types';
import { Box, Button, CircularProgress, Grid, Modal, Paper, Stack, styled } from '@mui/material';
import { formatDataGridDate } from '@/utils/format';

import React from 'react';
import dayjs from 'dayjs';
import AddProject from './AddProject';
import { useProjects } from '../api/getProjects';
import { QueryClientProvider } from 'react-query';
import { DeleteProject } from './DeleteProject';
import { EditProject } from './EditProject';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(.5),
}));

const DataGridProject = styled(DataGrid)({
  border: '0',
  marginTop: '-5.5vh',
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

  let projectsRows = projectsQuery.data?.data;

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGridProject
        pageSize={10}
        rows={projectsRows}
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
      <Grid container justifyContent="flex-end">
        <Item elevation={0}>
          <AddProject />
        </Item>
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <EditProject projectId={selectionModel.join()} />
          </Item>
        ) : (
          ''
        )}
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <DeleteProject id={selectionModel.join()} />
          </Item>
        ) : (
          ''
        )}
      </Grid>
      {/* <ControlButtons elevation={0}>
        
        {selectionModel && selectionModel.length ? <EditProject /> : ''}
        {selectionModel && selectionModel.length ?  : ''}
      </ControlButtons> */}
    </div>
  );
};
