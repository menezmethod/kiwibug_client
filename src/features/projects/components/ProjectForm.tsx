import { Form } from '@/components/Form/Form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CreateProjectDTO, useCreateProject } from '../api/createProject';
import { useForm } from 'react-hook-form';

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});
const ButtonProject = styled(Button)({
  padding: 16,
  margin: 10,
  textAlign: 'center',
});

type ProjectValues = {
  projectName: string;
  startDate: Date;
  targetEndDate: Date;
  actualEndDate: Date;
};

export default function AddProject() {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [targetEndDate, setTargetEndDate] = React.useState<Date | null>(null);
  const [actualEndDate, setActualEndDate] = React.useState<Date | null>(null);
  const onSubmit = (data: any) => console.log(data);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // async (values: any) => {
  //   //   await createProjectMutation.mutateAsync({ data: values });
  //   // console.log(values)
  // };
  const createProjectMutation = useCreateProject();

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>Project Details</h1>
          </Item>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Item elevation={0}>
              <TextField
                {...register('projectName')}
                fullWidth
                id="projectName"
                label="Project Name"
                variant="outlined"
              />
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(startDate1) => {
                    setStartDate(startDate1);
                    setValue('startDate', startDate1!.toISOString().slice(0, 10), { shouldValidate: true, shouldDirty: true});
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Target End Date"
                  value={targetEndDate}
                  onChange={(targetEndDate1) => {
                    setTargetEndDate(targetEndDate1);
                    setValue('targetEndDate', targetEndDate1!.toISOString().slice(0, 10), { shouldValidate: true, shouldDirty: true});
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Actual End Date"
                  value={actualEndDate}
                  onChange={(actualEndDate1) => {
                    setActualEndDate(actualEndDate1);
                    setValue('actualEndDate', actualEndDate1!.toISOString().slice(0, 10), { shouldValidate: true, shouldDirty: true});
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
