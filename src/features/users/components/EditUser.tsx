import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { useProjects } from '@/features/projects/api/getProjects';
import { queryClient } from '@/lib/react-query';
import { formatRoleForm } from '@/utils/format';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio,
    RadioGroup, Select, SelectChangeEvent, Stack, styled, TextField
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import { EditUserDTO, useEditUser } from '../api/editUser';
import { useUser } from '../api/getUser';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});

type EditUserProps = {
  employeeId: string;
};

export default function EditUser({ employeeId }: EditUserProps) {
  const userQuery = useUser({ employeeId });
  const editUserMutation = useEditUser();
  const projectsQuery = useProjects();

  const [open, setOpen] = React.useState(false);
  const [roleForm, setRoleForm] = React.useState('null');
  const [assignedProject, setAssignedProject] = React.useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event: SelectChangeEvent) => {
    setAssignedProject(event.target.value);
    if (parseInt(event.target.value) >= 1) {
      setValue('assignedProjects', { projectId: event.target.value });
    } else {
      setValue('assignedProjects', null);
    }
  };

  const changePassword = (event: { target: { value: string | any[] } }) => {
    if (event.target.value.length >= 6) setValue('password', event.target.value);
  };

  const convertRoles = (event: { target: { value: any } }) => {
    setValue('role', ['user', event.target.value]);
  };

  const { setValue, handleSubmit, control } = useForm();

  const handleOpen = () => {
    // Check if there are assigned projects to employee and tells react-form-hooks about it.
    if (userQuery.data?.assignedProjects !== null) {
      setAssignedProject(userQuery.data?.assignedProjects.projectId);
      setValue('assignedProjects', {
        projectId: userQuery.data?.assignedProjects.projectId,
      });
    } else {
      setValue('assignedProjects', null);
    }
    // Set the correct roles for the form.
    setRoleForm(formatRoleForm(userQuery.data?.roles));
    setValue('role', [formatRoleForm(userQuery.data?.roles), 'user']);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset query. This also allows the form to begin with most current selected values.
    queryClient.resetQueries('user');
    queryClient.resetQueries('users');
    queryClient.resetQueries('projects');
  };

  const onSubmit = async (values: any) => {
    await editUserMutation.mutateAsync({ data: values, employeeId });
    console.log(values);
    handleClose();
  };

  // Load projects to assign to employees.
  let projectsRows = projectsQuery?.data;

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon />}>
        Edit User
      </Button>
      <Container>
        <Form<EditUserDTO['data']> id="edit-user">
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-edit_user"
          >
            <DialogTitle id="responsive-edit_user">{'Edit User'}</DialogTitle>
            <DialogContent>
              <Box>
                <Stack spacing={2}>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="employeeName"
                          label="Person's Name"
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="employeeName"
                      defaultValue={userQuery.data?.employeeName}
                      control={control}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="email"
                          label="Email Address"
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="email"
                      control={control}
                      defaultValue={userQuery.data?.email}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="username"
                          label="Username"
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="username"
                      defaultValue={userQuery.data?.username}
                      control={control}
                    />
                  </Item>
                  <Item elevation={0}>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      onChange={changePassword}
                    />
                  </Item>

                  {/* IF ADMIN */}

                  <Item elevation={0}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Role</FormLabel>
                      <RadioGroup
                        onChange={convertRoles}
                        defaultValue={roleForm}
                        row
                        aria-label="Role"
                      >
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                        <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                      </RadioGroup>
                    </FormControl>
                  </Item>
                  {/* IF ADMIN */}

                  {/* IF ADMIN / MANAGER */}
                  <Item elevation={0}>
                    <Controller
                      name="assignedProjects"
                      control={control}
                      defaultValue={assignedProject}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="assigned_project">Assigned Project</InputLabel>
                          <Select
                            labelId="assigned_project_id"
                            id="assignedProjects"
                            value={assignedProject}
                            label="Assigned Project"
                            onChange={handleChange}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {projectsRows?.map((projectsRows: any) => (
                              <MenuItem key={projectsRows.projectId} value={projectsRows.projectId}>
                                {projectsRows.projectName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Item>
                </Stack>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus type="submit" onClick={handleSubmit(onSubmit)}>
                Edit
              </Button>
              <Button color="error" onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Container>
    </>
  );
}
