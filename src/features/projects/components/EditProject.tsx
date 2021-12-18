import { Form } from '@/components/Form/Form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { EditProjectDTO, useEditProject } from '../api/editProject';
import { Controller, useForm } from 'react-hook-form';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTheme } from '@mui/material/styles';
import { getProject, useProject } from '../api/getProject';
import { parseISO } from 'date-fns';
import { queryClient } from '@/lib/react-query';

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
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [targetEndDate, setTargetEndDate] = React.useState<Date | null>(new Date());
  const [actualEndDate, setActualEndDate] = React.useState<Date | null>(new Date());

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
    setOpen(false);
    console.log(values);
  };

  const handleOpen = () => {
    setOpen(true);
    setStartDate(projectQuery.data?.data.startDate);
    setTargetEndDate(projectQuery.data?.data.targetEndDate);
    setActualEndDate(projectQuery.data?.data.actualEndDate);
    console.log(projectId + ': ' + projectQuery.data?.data.projectName);
  };

  const handleClose = () => {
    setTargetEndDate(null);
    setActualEndDate(null);
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
                    <TextField
                      {...register('projectName', { required: 'Project name is required' })}
                      fullWidth
                      id="projectName"
                      label="Project Name"
                      variant="outlined"
                      value={projectQuery.data?.data.projectName}
                      error={errors?.projectName}
                      helperText={errors.projectName?.message}
                    />
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: true }}
                        // defaultValue={projectQuery.data?.data.startDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(startDate1) => {
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
                        rules={{ required: true }}
                        // defaultValue={projectQuery.data?.data.targetEndDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Target End Date"
                            value={targetEndDate}
                            minDate={projectQuery.data?.data.startDate}
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
                    </LocalizationProvider>
                  </Item>
                  <Item elevation={0}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="actualEndDate"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={projectQuery.data?.data.actualEndDate}
                        render={({ field: { ref, ...rest } }) => (
                          <DatePicker
                            label="Actual End Date"
                            minDate={projectQuery.data?.data.targetEndDate}
                            value={actualEndDate}
                            onChange={(actualEndDate1: React.SetStateAction<Date | null>) => {
                              setActualEndDate(actualEndDate1);
                              setValue('actualEndDate', actualEndDate1, {
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
