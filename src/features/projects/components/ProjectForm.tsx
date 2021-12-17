import { Form } from '@/components/Form/Form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CreateProjectDTO, useCreateProject } from '../api/createProject';
import { Controller, useForm } from 'react-hook-form';
import ProjectDataService from '../api/ProjectService';
import * as z from 'zod';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});
const ButtonProject = styled(Button)({
  padding: 16,
  margin: 10,
  textAlign: 'center',
});

export default function AddProject() {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [targetEndDate, setTargetEndDate] = React.useState<Date | null>(null);
  const [actualEndDate, setActualEndDate] = React.useState<Date | null>(null);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    await createProjectMutation.mutateAsync({ data: values });
    console.log(values);
  };

  const createProjectMutation = useCreateProject();

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>Project Details</h1>
          </Item>
          <Form<CreateProjectDTO['data']> id="add-project" onSubmit={handleSubmit(onSubmit)}>
            <Item elevation={0}>
              <TextField
                {...register('projectName', { required: 'Project name is required' })}
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
                  rules={{ required: true }}
                  defaultValue={startDate}
                  render={({ field: { ref, ...rest } }) => (
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(startDate1) => {
                        setStartDate(startDate1);
                        setValue('startDate', startDate1, {
                          // setValue('startDate', startDate1, {
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
                  render={({ field: { ref, ...rest } }) => (
                    <DatePicker
                      label="Target End Date"
                      value={targetEndDate}
                      minDate={startDate}
                      onChange={(targetEndDate1) => {
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
                  <Box sx={{ textAlign: 'left', margin: '10x' }}>
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
                  minDate={targetEndDate}
                  value={actualEndDate}
                  onChange={(actualEndDate1) => {
                    setActualEndDate(actualEndDate1);
                    setValue('actualEndDate', actualEndDate1, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <ButtonProject variant="contained" type="submit">
                Create
              </ButtonProject>{' '}
              {/* <ButtonProject variant="outlined">Cancel</ButtonProject> */}
            </Item>
          </Form>
        </Stack>
      </Box>
    </Container>
  );
}
