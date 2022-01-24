import { Form } from '@/components/Form/Form';
import { useProjects } from '@/features/projects/api/getProjects';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddUserDTO, useAddUser } from '../api/addUser';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});

export default function AddUser() {
  const addUserMutation = useAddUser();
  const projectsQuery = useProjects();

  const [open, setOpen] = React.useState(false);

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

  const convertRoles = (event: { target: { value: any } }) => {
    setValue('role', ['user', event.target.value]);
  };

  const { setValue, handleSubmit, control } = useForm();

  const handleOpen = () => {
    // Check if there are assigned projects to employee and tells react-form-hooks about it.
    // Set the correct roles for the form.
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values: any) => {
    await addUserMutation.mutateAsync({ data: values });
    console.log(values);
    handleClose();
  };

  // Load projects to assign to employees.
  let projectsRows = projectsQuery?.data;

  return (
    <>
      <LoadingButton
        onClick={handleOpen}
        variant="contained"
        loading={addUserMutation.isLoading}
        startIcon={<AddIcon />}
      >
        Add User
      </LoadingButton>
      <Container>
        <Form<AddUserDTO['data']> id="add-user">
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-add_user"
          >
            <DialogTitle id="responsive-add_user">{'Add User'}</DialogTitle>
            <DialogContent>
              <Box>
                <Stack spacing={2}>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="name"
                          label="Person's Name"
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="name"
                      control={control}
                      rules={{ required: true }}
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
                      rules={{ required: true }}
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
                      rules={{ required: true, minLength: 6 }}
                    />
                  </Item>

                  {/* IF ADMIN */}

                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Role</FormLabel>
                          <RadioGroup onChange={convertRoles} row aria-label="Role">
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                          </RadioGroup>
                        </FormControl>
                      )}
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
              <LoadingButton
                autoFocus
                loading={addUserMutation.isLoading}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </LoadingButton>
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
