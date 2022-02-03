import {Form} from '@/components/Form/Form';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import {DatePicker, LoadingButton, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Button, Container, Paper, Stack, styled, TextField, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box} from '@mui/system';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {AddProjectDTO, useAddProject} from '../api/addProject';

const Item = styled(Paper)({
    padding: 8,
    textAlign: 'center',
});

export default function AddProject() {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Date | null>(new Date());
    const [targetEndDate, setTargetEndDate] = React.useState<Date | null>(null);
    const [actualEndDate, setActualEndDate] = React.useState<Date | null>(null);

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const onSubmit = async (values: any) => {
        await addProjectMutation.mutateAsync({data: values});
        handleClose();
        console.log(values);
    };

    const addProjectMutation = useAddProject();

    return (
        <>
            <LoadingButton
                onClick={handleOpen}
                variant="contained"
                startIcon={<AccountTreeIcon/>}
                loading={addProjectMutation.isLoading}
            >
                Add Project
            </LoadingButton>
            <Container>
                <Form<AddProjectDTO['data']> id="add-project">
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{'Add Project'}</DialogTitle>
                        <DialogContent>
                            <Box>
                                <Stack spacing={2}>
                                    <Item elevation={0}>
                                        <TextField
                                            {...register('projectName', {required: 'Project name is required'})}
                                            fullWidth
                                            id="projectName"
                                            label="Project Name"
                                            variant="outlined"
                                            error={errors?.projectName}
                                            helperText={errors.projectName?.message}
                                        />
                                    </Item>
                                    <Item elevation={0}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Controller
                                                name="startDate"
                                                control={control}
                                                rules={{required: true}}
                                                defaultValue={startDate}
                                                render={({field: {ref, ...rest}}) => (
                                                    <DatePicker
                                                        label="Start Date"
                                                        value={startDate}
                                                        onChange={(startDate1: React.SetStateAction<Date | null>) => {
                                                            setStartDate(startDate1);
                                                            setValue('startDate', startDate1, {
                                                                shouldValidate: true,
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
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Controller
                                                name="targetEndDate"
                                                control={control}
                                                rules={{required: true}}
                                                render={({field: {ref, ...rest}}) => (
                                                    <DatePicker
                                                        label="Target End Date"
                                                        value={targetEndDate}
                                                        minDate={new Date()}
                                                        onChange={(targetEndDate1: React.SetStateAction<Date | null>) => {
                                                            setTargetEndDate(targetEndDate1);
                                                            setValue('targetEndDate', targetEndDate1, {
                                                                shouldValidate: true,
                                                                shouldDirty: true,
                                                            });
                                                        }}
                                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                                    />
                                                )}
                                            />
                                            <Typography variant="caption" color="error">
                                                <Box sx={{textAlign: 'left', margin: '10x'}}>
                                                    {errors.targetEndDate &&
                                                        errors.targetEndDate.type === 'required' &&
                                                        'Please enter a target end date!'}
                                                </Box>
                                            </Typography>
                                        </LocalizationProvider>
                                    </Item>
                                    <Item elevation={0}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Actual End Date"
                                                minDate={new Date()}
                                                value={actualEndDate}
                                                onChange={(actualEndDate1: React.SetStateAction<Date | null>) => {
                                                    setActualEndDate(actualEndDate1);
                                                    setValue('actualEndDate', actualEndDate1, {
                                                        shouldDirty: true,
                                                    });
                                                }}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                </Stack>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                variant="text"
                                autoFocus
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                loading={addProjectMutation.isLoading}
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
