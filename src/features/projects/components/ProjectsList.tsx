import LoaderSuspense from '@/components/LoaderSuspense';
import { formatDateGrid } from '@/utils/format';
import { Box, CircularProgress, Grid, Paper, styled } from '@mui/material';
import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useProjects } from '../api/getProjects';
import AddProject from './AddProject';
import { DeleteProject } from './DeleteProject';
import { EditProject } from './EditProject';

export type ProjectListtDTO = {
  data: {
    projectName: any;
    startDate: any;
    targetEndDate: any;
    actualEndDate: any;
  };
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
}));

const DataGridProject = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});

function startDateFormat(params: { row: { startDate: number } }) {
  return formatDateGrid(params.row.startDate);
}

function targetEndDateFormat(params: { row: { targetEndDate: number } }) {
  return formatDateGrid(params.row.targetEndDate);
}

function actualEndDateFormat(params: { row: { actualEndDate: number } }) {
  if (params.row.actualEndDate) {
    return formatDateGrid(params.row.actualEndDate);
  }
}

export const ProjectsList = () => {
  const projectsQuery = useProjects();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    // console.log(selectionModel);
  }, [selectionModel]);

  if (projectsQuery.isLoading) {
    return <LoaderSuspense />;
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
      valueGetter: startDateFormat,
    },
    {
      field: 'targetEndDate',
      headerName: 'Target End Date',
      width: 280,
      valueGetter: targetEndDateFormat,
    },
    {
      field: 'actualEndDate',
      headerName: 'Actual End Date',
      width: 280,
      valueGetter: actualEndDateFormat,
    },
  ];

  if (!projectsQuery.data) return null;

  let projectsRows = projectsQuery?.data;

  return (
    <div style={{ height: '71vh', width: '100%' }}>
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
    </div>
  );
};
