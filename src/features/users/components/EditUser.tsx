import { Form } from '@/components/Form/Form';
import { useProjects } from '@/features/projects/api/getProjects';
import { queryClient } from '@/lib/react-query';
import { formatRoleForm } from '@/utils/format';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
  const [role, setRole] = React.useState('user');
  const [assignedProject, setAssignedProject] = React.useState('');

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event: SelectChangeEvent) => {
    setAssignedProject(event.target.value as string);
  };

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleOpen = () => {
    // Check if there are assigned projects to employee and tells react-form-hooks about it.
    if (userQuery.data?.data.assignedProjects !== null) {
      setAssignedProject(userQuery.data?.data.assignedProjects.projectId);
      setValue('assignedProjects', {
        employeeId: userQuery.data?.data.assignedProjects.projectId,
      });
    } else {
      setValue('assignedProjects', null);
    }
    // Set the correct roles for the form.
    setRoleForm(formatRoleForm(userQuery.data?.data.roles));

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset cache. This also allows the form to begin with most current selected values.
    queryClient.resetQueries('user');
    queryClient.resetQueries('users');
    queryClient.resetQueries('projects');
  };
  const onSubmit = async (values: any) => {
    await editUserMutation.mutateAsync({ data: values, employeeId });
    console.log(values);
    handleClose();
  };

  let projectsRows = projectsQuery.data?.data;

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
                      name="username"
                      defaultValue={userQuery.data?.data.employeeName}
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
                      defaultValue={userQuery.data?.data.email}
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
                      control={control}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="password"
                      control={control}
                    />
                  </Item>

                  {/* IF ADMIN */}

                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Role</FormLabel>
                          <RadioGroup row aria-label="Role" {...field}>
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                          </RadioGroup>
                        </FormControl>
                      )}
                      defaultValue={roleForm}
                      name="role"
                      control={control}
                    />
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
