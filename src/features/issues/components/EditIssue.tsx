import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { useProjects } from '@/features/projects/api/getProjects';
import { useUsers } from '@/features/users/api/getUsers';
import { queryClient } from '@/lib/react-query';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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

import { EditIssueDTO, useEditIssue } from '../api/editIssue';
import { useIssue } from '../api/getIssue';

const Item = styled(Paper)({
  pediting: 4,
  textAlign: 'center',
});

type EditIssueProps = {
  issueId: string;
};

export default function EditIssue({ issueId }: EditIssueProps) {
  // Load list of projects and users from api for select assignment
  const projectsQuery = useProjects();
  const usersQuery = useUsers();

  // Load single issue data from api.
  const issueQuery = useIssue({ issueId });
  const editIssueMutation = useEditIssue();
  const [open, setOpen] = React.useState(false);
  const [targetResolutionDate, setTargetResolutionDate] = React.useState<Date | undefined | null>(
    undefined
  );
  const [identifiedDate, setIdentifiedDate] = React.useState<Date | undefined | null>(undefined);
  const [actualResEndDate, setActualResDate] = React.useState<Date | undefined | null>(undefined);
  const [relatedProjectId, setRelatedProjectId] = React.useState('');
  const [identifiedBy, setIdentifiedBy] = React.useState('');
  const [assignedTo, setAssignedTo] = React.useState('');

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Load react-hook-form
  const { setValue, handleSubmit, control } = useForm();

  const handleOpen = async () => {
    // Set the dates to correct default values on open. *Will probably have to refactor this.

    setTargetResolutionDate(issueQuery.data?.targetResolutionDate);
    setIdentifiedDate(issueQuery.data?.identifiedDate);
    setActualResDate(issueQuery.data?.actualResolutionDate);

    // Check if there are related projects, identified by employee, or assigned to employee.
    if (issueQuery.data?.relatedProjectId !== null) {
      setValue('relatedProjectId', { projectId: issueQuery.data?.relatedProjectId.projectId });
    } else {
      setValue('relatedProjectId', null);
    }
    if (issueQuery.data?.identifiedByEmployeeId !== null) {
      setIdentifiedBy(issueQuery.data?.identifiedByEmployeeId.employeeId);
      setValue('identifiedByEmployeeId', {
        employeeId: issueQuery.data?.identifiedByEmployeeId.employeeId,
      });
    } else {
      setValue('identifiedByEmployeeId', null);
    }
    if (issueQuery.data?.assignedToEmployeeId !== null) {
      setAssignedTo(issueQuery.data?.assignedToEmployeeId.employeeId);
      setValue('assignedToEmployeeId', {
        employeeId: issueQuery.data?.assignedToEmployeeId.employeeId,
      });
    } else {
      setValue('assignedToEmployeeId', null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset cache. This also allows the form to begin with most current selected values.
    queryClient.resetQueries('issue');
    queryClient.resetQueries('projects');
    queryClient.resetQueries('users');
    queryClient.resetQueries('issues');
  };
  const onSubmit = async (values: any) => {
    await editIssueMutation.mutateAsync({ data: values, issueId });
    console.log(values);
    handleClose();
  };

  // Handle assignment select and do correct JSON nesting with react hook forms.
  const handleChangeAp = (event: SelectChangeEvent) => {
    setRelatedProjectId(event.target.value);
    if (parseInt(event.target.value) >= 1) {
      setValue('relatedProjectId', { projectId: event.target.value });
    } else {
      setValue('relatedProjectId', null);
    }
  };
  const handleChangeIB = (event: SelectChangeEvent) => {
    setIdentifiedBy(event.target.value);
    if (parseInt(event.target.value) >= 1) {
      setValue('identifiedByEmployeeId', { employeeId: event.target.value });
    } else {
      setValue('identifiedByEmployeeId', null);
    }
  };
  const handleChangeAT = (event: SelectChangeEvent) => {
    setAssignedTo(event.target.value);
    if (parseInt(event.target.value) >= 1) {
      setValue('assignedToEmployeeId', { employeeId: event.target.value });
    } else {
      setValue('assignedToEmployeeId', null);
    }
  };

  // Return null if no data from projects or users.
  if (!projectsQuery.data) return null;
  if (!usersQuery.data) return null;

  // Load data from api for assignment selects
  let projectsRows = projectsQuery?.data;
  let usersRows = usersQuery?.data;
  const options = {
    filterType: 'checkbox',
  };
  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon />}>
        Edit Issue
      </Button>
      <Container>
        <Form<EditIssueDTO['data']> id="edit-issue">
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-edit_issue"
          >
            <DialogTitle id="responsive-edit_issue">{'Edit Issue'}</DialogTitle>
            <DialogContent>
              <Box>
                <Stack spacing={2}>
                  <Item elevation={1}>
                    <h1>Issue Identification</h1>
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="issueSummary"
                          label="Issue Summary"
                          multiline
                          maxRows={2}
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="issueSummary"
                      control={control}
                      defaultValue={issueQuery.data?.issueSummary}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="issue-description"
                          label="Issue Description"
                          maxRows={2}
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="issueDescription"
                      control={control}
                      defaultValue={issueQuery.data?.issueDescription}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      name="relatedProjectId"
                      control={control}
                      defaultValue={relatedProjectId}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="related-project-id">Related Project</InputLabel>
                          <Select
                            labelId="related-project"
                            id="assignedProjects"
                            value={relatedProjectId}
                            label="Related Project"
                            onChange={handleChangeAp}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {projectsRows.map((projectsRows: any) => (
                              <MenuItem key={projectsRows.projectId} value={projectsRows.projectId}>
                                {projectsRows.projectName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      name="identifiedByEmployeeId"
                      control={control}
                      defaultValue={identifiedBy}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="assigned_project_lb">Identified By</InputLabel>
                          <Select
                            labelId="identified-by"
                            id="identifiedBy"
                            value={identifiedBy}
                            label="Identified By"
                            onChange={handleChangeIB}
                          >
                            <MenuItem value="">
                              <em>Nobody</em>
                            </MenuItem>
                            {usersRows.map((usersRows: any) => (
                              <MenuItem key={usersRows.employeeId} value={usersRows.employeeId}>
                                {usersRows.employeeName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="identifiedDate"
                        control={control}
                        // rules={{ required: true }}
                        defaultValue={identifiedDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Identified Date"
                            value={identifiedDate}
                            onChange={(newIdentifiedDate) => {
                              setIdentifiedDate(newIdentifiedDate);
                              setValue('identifiedDate', newIdentifiedDate, {
                                shouldDirty: true,
                              });
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Item>
                  <Item elevation={1}>
                    <h1>Progress</h1>
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      name="assignedToEmployeeId"
                      control={control}
                      defaultValue={assignedTo}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="assigned_to">Assigned To</InputLabel>
                          <Select
                            labelId="assigned-project"
                            id="assignedTo"
                            value={assignedTo}
                            label="Assigned Project"
                            onChange={handleChangeAT}
                          >
                            <MenuItem value="">
                              <em>Nobody</em>
                            </MenuItem>
                            {usersRows.map((usersRows: any) => (
                              <MenuItem key={usersRows.employeeId} value={usersRows.employeeId}>
                                {usersRows.employeeName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Status</FormLabel>
                          <RadioGroup row aria-label="status" {...field}>
                            <FormControlLabel value="Open" control={<Radio />} label="Open" />
                            <FormControlLabel value="On-Hold" control={<Radio />} label="On-Hold" />
                            <FormControlLabel
                              value="Closed"
                              control={<Radio />}
                              label="Closed"
                            />{' '}
                          </RadioGroup>
                        </FormControl>
                      )}
                      defaultValue={issueQuery.data?.status}
                      name="status"
                      control={control}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Priority</FormLabel>
                          <RadioGroup row aria-label="priority" {...field}>
                            <FormControlLabel value="High" control={<Radio />} label="High" />
                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="Low" control={<Radio />} label="Low" />{' '}
                          </RadioGroup>
                        </FormControl>
                      )}
                      name="priority"
                      control={control}
                      defaultValue={issueQuery.data?.priority}
                      // rules={{ required: true }}
                    />
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="targetResolutionDate"
                        control={control}
                        // rules={{ required: true }}
                        defaultValue={targetResolutionDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Target Resolution Date"
                            value={targetResolutionDate}
                            onChange={(newTargetResolutionDate) => {
                              setTargetResolutionDate(newTargetResolutionDate);
                              setValue('targetResolutionDate', newTargetResolutionDate, {
                                shouldDirty: true,
                              });
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Item>
                  <Item elevation={1}>
                    <h1>Resolution</h1>
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="actualResolutionDate"
                        control={control}
                        defaultValue={actualResEndDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Actual Resolution Date"
                            value={actualResEndDate}
                            onChange={(newActualResDate) => {
                              setActualResDate(newActualResDate);
                              setValue('actualResolutionDate', newActualResDate, {
                                shouldDirty: true,
                              });
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          label="Progress"
                          fullWidth
                          multiline
                          variant="outlined"
                          maxRows={2}
                          {...field}
                        />
                      )}
                      name="progress"
                      control={control}
                      defaultValue={issueQuery.data?.progress}
                    />
                  </Item>
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="resolutionSummary"
                          label="Resolution Summary"
                          multiline
                          maxRows={2}
                          variant="outlined"
                          {...field}
                        />
                      )}
                      name="resolutionSummary"
                      defaultValue={issueQuery.data?.resolutionSummary}
                      control={control}
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
