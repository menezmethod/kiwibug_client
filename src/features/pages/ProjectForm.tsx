import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

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
  const [value1, setValue1] = React.useState<Date | null>(null);
  const [value2, setValue2] = React.useState<Date | null>(null);
  const [value3, setValue3] = React.useState<Date | null>(null);

  return (
    <Container>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>Project Details</h1>
          </Item>
          <Item elevation={0}>
            <TextField fullWidth id="projectName" label="Project Name" variant="outlined" />
          </Item>
          <Item elevation={0}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={value1}
                onChange={(newValue1) => {
                  setValue1(newValue1);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={0}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Target End Date"
                value={value2}
                onChange={(newValue2) => {
                  setValue2(newValue2);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={0}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Actual End Date"
                value={value3}
                onChange={(newValue3) => {
                  setValue3(newValue3);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Item>
          <Item elevation={0}>
            <ButtonProject variant="contained">Create</ButtonProject>{' '}
            <ButtonProject variant="outlined">Cancel</ButtonProject>
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
