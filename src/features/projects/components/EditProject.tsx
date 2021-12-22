import { parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { queryClient } from '@/lib/react-query';
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import { EditProjectDTO, useEditProject } from '../api/editProject';
import { getProject, useProject } from '../api/getProject';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});

type EditProjectProps = {
  projectId: string;
};

export const EditProject = ({ projectId }: EditProjectProps) => {
  const editProjectMutation = useEditProject();
  const projectQuery = useProject({ projectId });
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined | null>(undefined);
  const [targetEndDate, setTargetEndDate] = React.useState<Date | undefined | null>(undefined);
  const [actualEndDate, setActualEndDate] = React.useState<Date | undefined | null>(undefined);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    await editProjectMutation.mutateAsync({ data: values, projectId });
    handleClose();
    console.log(values);
  };

  const handleOpen = () => {
    setStartDate(projectQuery.data?.data.startDate);
    setTargetEndDate(projectQuery.data?.data.targetEndDate);
    setActualEndDate(projectQuery.data?.data.actualEndDate);
    setOpen(true);

    console.log(projectId + ': ' + projectQuery.data?.data.projectName);
  };

  const handleClose = () => {
    queryClient.resetQueries('project');
    queryClient.resetQueries('projects');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon />}>
        Edit
      </Button>

      <Container>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{'Edit Project'}</DialogTitle>
          <DialogContent>
            <Box>
              <Stack spacing={2}>
                <Form<EditProjectDTO['data']> id="edit-project">
                  <Item elevation={0}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          id="projectName"
                          label="Project Name"
                          variant="outlined"
                          error={errors?.projectName}
                          helperText={errors.projectName?.message}
                          {...field}
                        />
                      )}
                      name="projectName"
                      control={control}
                      defaultValue={projectQuery.data?.data.projectName}
                    />
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="startDate"
                        control={control}
                        defaultValue={startDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(startDate1) => {
                              setStartDate(startDate1);
                              setValue('actualEndDate', projectQuery.data?.data.actualEndDate);
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
                        defaultValue={targetEndDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Target End Date"
                            value={targetEndDate}
                            minDate={startDate}
                            onChange={(targetEndDate1) => {
                              setTargetEndDate(targetEndDate1);
                              setValue('actualEndDate', projectQuery.data?.data.actualEndDate);
                              setValue('targetEndDate', targetEndDate1, {
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
                        name="actualEndDate"
                        control={control}
                        defaultValue={actualEndDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Actual End Date"
                            minDate={startDate}
                            value={actualEndDate}
                            onChange={(actualEndDate1) => {
                              setActualEndDate(actualEndDate1);
                              setValue('actualEndDate', actualEndDate1, {
                                shouldValidate: true,
                              });
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Item>
                </Form>
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" onClick={handleSubmit(onSubmit)}>
              Edit
            </Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
