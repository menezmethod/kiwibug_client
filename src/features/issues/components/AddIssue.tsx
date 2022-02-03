import {Form} from '@/components/Form/Form';
import {useProjects} from '@/features/projects/api/getProjects';
import {useUsers} from '@/features/users/api/getUsers';
import BugReportIcon from '@mui/icons-material/BugReport';
import {DatePicker, LoadingButton, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
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
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box} from '@mui/system';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {AddIssueDTO, useAddIssue} from '../api/addIssue';

const Item = styled(Paper)({
    padding: 4,
    textAlign: 'center',
});

export default function AddIssue() {
    const projectsQuery = useProjects();
    const usersQuery = useUsers();
    const addIssueMutation = useAddIssue();
    const [open, setOpen] = React.useState(false);
    const [targetResolutionDate, setTargetResolutionDate] = React.useState<Date | null>(null);
    const [identifiedDate, setIdentifiedDate] = React.useState<Date | null>(null);
    const [actualResEndDate, setActualResDate] = React.useState<Date | null>(null);
    const [relatedProjectId, setRelatedProjectId] = React.useState('');
    const [identifiedBy, setIdentifiedBy] = React.useState('');
    const [assignedTo, setAssignedTo] = React.useState('');

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {setValue, handleSubmit, control} = useForm();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const onSubmit = async (values: any) => {
        await addIssueMutation.mutateAsync({data: values});
        handleClose();
        console.log(values);
    };

    const handleChangeAp = (event: SelectChangeEvent) => {
        setRelatedProjectId(event.target.value);
        setValue('relatedProjectId', {projectId: event.target.value});
    };

    const handleChangeIB = (event: SelectChangeEvent) => {
        setIdentifiedBy(event.target.value);
        setValue('identifiedByEmployeeId', {employeeId: event.target.value});
    };
    const handleChangeAT = (event: SelectChangeEvent) => {
        setAssignedTo(event.target.value);
        setValue('assignedToEmployeeId', {employeeId: event.target.value});
    };

    if (!projectsQuery.data) return null;
    if (!usersQuery.data) return null;

    let projectsRows = projectsQuery?.data;
    let usersRows = usersQuery?.data;

    return (
        <>
            <LoadingButton
                onClick={handleOpen}
                variant="contained"
                loading={addIssueMutation.isLoading}
                startIcon={<BugReportIcon/>}
            >
                Add Issue
            </LoadingButton>
            <Container>
                <Form<AddIssueDTO['data']> id="add-issue">
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-add_issue"
                    >
                        <DialogTitle id="responsive-add_issue">{'Add Issue'}</DialogTitle>
                        <DialogContent>
                            <Box>
                                <Stack spacing={2}>
                                    <Item elevation={1}>
                                        <h1>Issue Identification</h1>
                                    </Item>
                                    <Item elevation={0}>
                                        <Controller
                                            render={({field}) => (
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
                                        />
                                    </Item>
                                    <Item elevation={0}>
                                        <Controller
                                            render={({field}) => (
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
                                        />
                                    </Item>
                                    <Item elevation={0}>
                                        <Controller
                                            name="relatedProjectId"
                                            control={control}
                                            render={({field}) => (
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
                                                            <MenuItem key={projectsRows.projectId}
                                                                      value={projectsRows.projectId}>
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
                                            // rules={{ required: true }}
                                            render={({field}) => (
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
                                                            <MenuItem key={usersRows.employeeId}
                                                                      value={usersRows.employeeId}>
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
                                                render={({field: {ref, ...rest}}) => (
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
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <InputLabel id="assigned_to">Assigned To</InputLabel>
                                                    <Select
                                                        labelId="assigned-to"
                                                        id="assignedTo"
                                                        value={assignedTo}
                                                        label="Assigned Project"
                                                        onChange={handleChangeAT}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Nobody</em>
                                                        </MenuItem>
                                                        {usersRows.map((usersRows: any) => (
                                                            <MenuItem key={usersRows.employeeId}
                                                                      value={usersRows.employeeId}>
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
                                            render={({field}) => (
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Status</FormLabel>
                                                    <RadioGroup row aria-label="status" {...field}>
                                                        <FormControlLabel value="Open" control={<Radio/>} label="Open"/>
                                                        <FormControlLabel value="On-Hold" control={<Radio/>}
                                                                          label="On-Hold"/>
                                                        <FormControlLabel
                                                            value="Closed"
                                                            control={<Radio/>}
                                                            label="Closed"
                                                        />{' '}
                                                    </RadioGroup>
                                                </FormControl>
                                            )}
                                            name="status"
                                            control={control}
                                        />
                                    </Item>
                                    <Item elevation={0}>
                                        <Controller
                                            render={({field}) => (
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Priority</FormLabel>
                                                    <RadioGroup row aria-label="priority" {...field}>
                                                        <FormControlLabel value="High" control={<Radio/>} label="High"/>
                                                        <FormControlLabel value="Medium" control={<Radio/>}
                                                                          label="Medium"/>
                                                        <FormControlLabel value="Low" control={<Radio/>}
                                                                          label="Low"/>{' '}
                                                    </RadioGroup>
                                                </FormControl>
                                            )}
                                            name="priority"
                                            control={control}
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
                                                render={({field: {ref, ...rest}}) => (
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
                                                render={({field: {ref, ...rest}}) => (
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
                                            render={({field}) => (
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
                                        />
                                    </Item>
                                    <Item elevation={0}>
                                        <Controller
                                            render={({field}) => (
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
                                            control={control}
                                        />
                                    </Item>
                                </Stack>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                autoFocus
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                loading={addIssueMutation.isLoading}
                            >
                                Add
                            </LoadingButton>
                            <LoadingButton color="error" onClick={handleClose} autoFocus>
                                Cancel
                            </LoadingButton>
                        </DialogActions>
                    </Dialog>
                </Form>
            </Container>
        </>
    );
}
