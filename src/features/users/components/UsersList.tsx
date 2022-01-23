import LoaderSuspense from '@/components/LoaderSuspense';
import { formatRole } from '@/utils/format';
import { Grid, Paper, styled } from '@mui/material';
import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useUsers } from '../api/getUsers';
import AddUser from './AddUser';
import { DeleteUser } from './DeleteUser';
import EditUser from './EditUser';

const DataGridUser = styled(DataGrid)({
  border: '0',
  marginTop: '-4vh',
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
}));

export const UsersList = () => {
  const usersQuery = useUsers();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  if (usersQuery.isLoading) {
    return <LoaderSuspense />;
  }

  if (!usersQuery.data) return null;

  let usersRows = usersQuery?.data;

  function getAssignedProject(params: { row: { assignedProjects: { projectName: any } } }) {
    if (params.row.assignedProjects === null) {
      return 'Unassigned';
    }
    return `${params.row.assignedProjects.projectName}`;
  }

  function getRole(params: any) {
    return formatRole(params.row.roles);
  }
  const userColumns = [
    {
      field: 'employeeName',
      headerName: 'Name',
      width: 180,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
    },
    {
      field: 'employeeRole',
      headerName: 'Role',
      width: 180,
      valueGetter: getRole,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 180,
    },
    {
      field: 'assignedProjects',
      headerName: 'Assigned Project',
      width: 255,
      valueGetter: getAssignedProject,
    },
  ];
  return (
    <div style={{ height: '71vh', width: '100%' }}>
      <DataGridUser
        rows={usersRows}
        columns={userColumns}
        pageSize={5}
        getRowId={(row: { employeeId: any }) => row.employeeId}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: 'employeeName',
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
          <AddUser />
        </Item>
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <EditUser employeeId={selectionModel.join()} />
          </Item>
        ) : (
          ''
        )}
        {selectionModel && selectionModel.length ? (
          <Item elevation={0}>
            <DeleteUser id={selectionModel.join()} />
          </Item>
        ) : (
          ''
        )}
      </Grid>
    </div>
  );
};
