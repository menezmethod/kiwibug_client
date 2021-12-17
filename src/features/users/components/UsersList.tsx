import { DataGrid, GridSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, ChangeEvent } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@material-ui/icons/Edit';
// import { RouteComponentProps } from 'react-router-dom';
import { User } from '../types';
import { Box, Button, Modal, Paper, styled } from '@mui/material';

import UserDataService from '../api/UserService';
import UserForm from './UserForm';
import React from 'react';

// interface RouterProps {
//   // type for `match.params`
//   id: string; // must be type `string` since value comes from the URL
// }

// type Props = RouteComponentProps<RouterProps>;

const ControlButtons = styled(Paper)({
  padding: 8,
  textAlign: 'right',
});

const DataGridUser = styled(DataGrid)({
  border:'0',
  marginTop:'-4vh'
});

const UserButtons = styled(Button)({
  padding: 10,
  margin: 6,
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

export const UsersList = () => {
  const initialUserState = {
    employeeName: '',
    email: '',
    employeeRole: '',
    username: '',
    createdOn: null,
    createdBy: '',
    modifiedOn: null,
    modifiedBy: '',
    projectName: '',
  };
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    retrieveUsers();
    console.log(selectionModel);
  }, [selectionModel]);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response: any) => {
        setUserData(response.data);
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

  const handleDeleteUser = () => {
    console.log('Deleting: ' + selectionModel);
    UserDataService.remove(selectionModel)
      .then((response: any) => {
        console.log(response.data);
        // props.history.push('/employees');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleEdit = () => {};

  const handleSubmit = () => {};

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  function getAssignedProject(params: { row: { assignedProjects: { projectName: any } } }) {
    if (params.row.assignedProjects === null) {
      return 'Unassigned';
    }
    return `${params.row.assignedProjects.projectName}`;
  }

  // function getRole(params: { row: { roles: { b: string; }[]; }; }) {
  //   (params.row.roles.map((item: { b: string; }, i: any)=> {

  //   });
  // }

  function getRole(params: { row: { roles: { name: any; }[]; }; }) {
    switch(params.row.roles[0].name) {
      case 'ROLE_USER':
        return 'User';
      case 'ROLE_MANAGER':
        return 'Manager';
      case 'ROLE_LEAD':
        return 'Lead';
      case 'ROLE_ADMIN':
        return 'Administrator';
    }
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
        rows={userData}
        columns={userColumns}
        pageSize={5}
        getRowId={(row: { employeeId: any; }) => row.employeeId}
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
      <ControlButtons elevation={0}>
        <UserButtons onClick={handleOpen} variant="outlined" startIcon={<PersonAddAltIcon />}>
          Add User
        </UserButtons>
        {selectionModel && selectionModel.length ? (
          <UserButtons onClick={handleEdit} variant="outlined" startIcon={<EditIcon />}>
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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={userModalStyle}>
          <UserForm />
        </Box>
      </Modal>
    </div>
  );
};
