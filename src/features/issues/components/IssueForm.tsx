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
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import React from 'react';

const Item = styled(Paper)({
  padding: 4,
  textAlign: 'center',
});
const ButtonIssue = styled(Button)({
  padding: 16,
  margin: 10,
  textAlign: 'center',
});

export default function AddIssue() {
  const [value1, setValue1] = React.useState<Date | null>(null);
  const [value2, setValue2] = React.useState<Date | null>(null);
  const [value3, setValue3] = React.useState<Date | null>(null);
  const [assignedProject, setAssignedProject] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAssignedProject(event.target.value);
  };
  

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>Issue Identification</h1>
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="issueSummary"
              label="Issue Summary"
              multiline
              maxRows={2}
              variant="outlined"
            />
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="issueDescription"
              label="Issue Description"
              maxRows={2}
              variant="outlined"
            />
          </Item>
          <Item elevation={0}>
            <FormControl fullWidth>
              <InputLabel id="assigned_project_lb">Related Project</InputLabel>
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
            <FormControl fullWidth>
              <InputLabel id="assigned_project_lb">Identified By</InputLabel>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Identified Date"
                value={value2}
                onChange={(newValue2) => {
                  setValue2(newValue2);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={1}>
            <h1>Progress</h1>
          </Item>
          <Item elevation={0}>
            <FormControl fullWidth>
              <InputLabel id="assigned_project_lb">Assigned To</InputLabel>
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
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup row aria-label="Status" name="row-radio-buttons-group">
                <FormControlLabel value="OPEN" control={<Radio />} label="Open" />
                <FormControlLabel value="ONHOLD" control={<Radio />} label="On-Hold" />
                <FormControlLabel value="CLOSED" control={<Radio />} label="Closed" />{' '}
              </RadioGroup>
            </FormControl>
          </Item>
          <Item elevation={0}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup row aria-label="Status" name="row-radio-buttons-group">
                <FormControlLabel value="HIGH" control={<Radio />} label="High" />
                <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
                <FormControlLabel value="LOW" control={<Radio />} label="Low" />{' '}
              </RadioGroup>
            </FormControl>
          </Item>
          <Item elevation={0}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Target Resolution Date"
                value={value1}
                onChange={(newValue1) => {
                  setValue1(newValue1);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="progress"
              label="Progress"
              multiline
              maxRows={2}
              variant="outlined"
            />
          </Item>
          <Item elevation={1}>
            <h1>Resolution</h1>
          </Item>
          <Item elevation={0}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Actual Resolution Date"
                value={value3}
                onChange={(newValue3) => {
                  setValue3(newValue3);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="progress"
              label="Progress"
              multiline
              maxRows={2}
              variant="outlined"
            />
          </Item>
          <Item elevation={0}>
            <TextField
              fullWidth
              id="resolutionSummary"
              label="Resolution Summary"
              multiline
              maxRows={2}
              variant="outlined"
            />
          </Item>
          <Item elevation={0}>
            <ButtonIssue variant="contained">Create</ButtonIssue>{' '}
            <ButtonIssue variant="outlined">Cancel</ButtonIssue>
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
