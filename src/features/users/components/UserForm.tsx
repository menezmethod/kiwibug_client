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
import { Box } from '@mui/system';
import React from 'react';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});
const ButtonUser = styled(Button)({
  padding: 16,
  margin: 10,
  textAlign: 'center',
});

export default function AddProject() {
  const [assignedProject, setAssignedProject] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAssignedProject(event.target.value as string);
  };

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>User Information</h1>
          </Item>
          <Item elevation={0}>
            <TextField fullWidth id="personName" label="Person's Name" variant="outlined" />
          </Item>
          <Item elevation={0}>
            <TextField fullWidth id="personEmail" label="Email Address" variant="outlined" />
          </Item>
          <Item elevation={0}>
            <TextField fullWidth id="username" label="Username" variant="outlined" />
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
            />
          </Item>
          <Item elevation={0}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup row aria-label="Role" name="row-radio-buttons-group">
                <FormControlLabel value="CEO" control={<Radio />} label="CEO" />
                <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                <FormControlLabel value="lead" control={<Radio />} label="Lead" />
                <FormControlLabel value="member" control={<Radio />} label="Member" />
              </RadioGroup>
            </FormControl>
          </Item>
          <Item elevation={0}>
            <FormControl fullWidth>
              <InputLabel id="assigned_project_lb">Assigned Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="assignedProjects"
                value={assignedProject}
                label="Assigned Project"
                onChange={handleChange}
              >
                <MenuItem value={10}>Project 1</MenuItem>
                <MenuItem value={20}>Project 2</MenuItem>
                <MenuItem value={30}>Project 3</MenuItem>
              </Select>
            </FormControl>
          </Item>
          <Item elevation={0}>
            <ButtonUser variant="contained">Create</ButtonUser>{' '}
            <ButtonUser variant="outlined">Cancel</ButtonUser>
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
