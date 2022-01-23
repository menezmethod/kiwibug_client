import LoaderSuspense from '@/components/LoaderSuspense';
import { formatDateGrid } from '@/utils/format';
import { Container, Grid, Stack, styled } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
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

const Add = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  '@media(minWidth: 780px)': {
    alignItems: 'center',
  },
}));

export const ProjectsList = () => {
  const projectsQuery = useProjects();

  if (projectsQuery.isLoading) {
    return <LoaderSuspense />;
  }

  const projectColumns = [
    {
      label: 'PROJECT NAME',
      name: 'projectName',
    },
    {
      name: 'startDate',
      label: 'START DATE',
      options: {
        customBodyRender: (value: any) => formatDateGrid(value),
      },
    },
    {
      name: 'targetEndDate',
      label: 'TARGET END DATE',
      options: {
        customBodyRender: (value: any) => formatDateGrid(value),
      },
    },
    {
      name: 'actualEndDate',
      label: 'ACTUAL END DATE',
      options: {
        customBodyRender: (value: any) => (value ? formatDateGrid(value) : ''),
      },
    },
    {
      name: 'projectId',
      label: ' ',
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <Grid container spacing={0} justifyContent="center">
              <Grid item>
                <EditProject projectId={value} show="icon" />
              </Grid>
              <Grid item>
                <DeleteProject id={value} show="icon" />
              </Grid>
            </Grid>
          );
        },
      },
    },
  ];
  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
  };
  if (!projectsQuery.data) return null;

  let projectsRows = projectsQuery?.data;

  return (
    <Container maxWidth={false}>
      <Grid container justifyContent="flex-end">
        <Add>
          <AddProject />
        </Add>
      </Grid>
      <br />
      <MUIDataTable
        title="Projects"
        data={projectsRows}
        columns={projectColumns}
        options={options}
      />
    </Container>
  );
};
