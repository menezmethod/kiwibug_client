import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import axios, { AxiosResponse } from 'axios';
import { User } from '../types';
import { Button, Paper, styled } from '@mui/material';

import UserDataService from "../api/UserService";

// import { DeleteUser } from './DeleteUser';

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});
const UserButtons = styled(Button)({
  padding: 10,
  margin: 6,
});

export const UsersList = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    // axios.get<User[]>('http://localhost:8080/employees').then((response: AxiosResponse) => {
    //   setUserData(response.data);
    // });
    retrieveUsers();
  }, [selectionModel]);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response: any) => {
        setUserData(response.data);
        console.log(response.data);
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

  const handleDeleteUser = () => {
    console.log('Deleting: ' + selectionModel);
    axios.delete('http://localhost:8080/employees/' + selectionModel);
  };

  const handleEdit = () => {};

  const handleClose = () => {};

  const handleSubmit = () => {};

  function getAssignedProject(params: { row: { assignedProjects: { projectName: any } } }) {
    return `${params.row.assignedProjects.projectName}`;
  }

  const userColumns = [
    {
      field: 'employeeName',
      headerName: 'Name',
      width: 180,
    },
    {
      field: 'employeeEmail',
      headerName: 'Email',
      width: 180,
    },
    {
      field: 'employeeRole',
      headerName: 'Role',
      width: 180,
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
      <DataGrid
        rows={userData}
        columns={userColumns}
        pageSize={5}
        getRowId={(row) => row.employeeId}
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
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <ControlButtons elevation={0}>
        <UserButtons onClick={handleEdit} variant="outlined" startIcon={<PersonAddAltIcon />}>
          Add User
        </UserButtons>
        {selectionModel && selectionModel.length ? (
          <UserButtons onClick={handleSubmit} variant="outlined" startIcon={<EditIcon />}>
            Edit
          </UserButtons>
        ) : (
          ''
        )}

        {selectionModel && selectionModel.length ? (
          <UserButtons
            onClick={handleDeleteUser}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </UserButtons>
        ) : (
          ''
        )}
      </ControlButtons>
    </div>
  );
};
