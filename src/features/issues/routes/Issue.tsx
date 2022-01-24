import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import ViewIssue from '../components/ViewIssue';
import { useParams } from 'react-router-dom';
import { Grid, styled } from '@mui/material';
import EditIssue from '../components/EditIssue';
import { DeleteIssue } from '../components/DeleteIssue';

const Add = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  '@media(minWidth: 780px)': {
    alignItems: 'center',
  },
}));

export const Issue = () => {
  const { id } = useParams();

  return (
    <ContentLayout title="Edit Issue">
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item>
          <EditIssue issueId={id} show="button" />
        </Grid>
        <Grid item>
          <DeleteIssue id={id} show="button" />
        </Grid>
      </Grid>
      <br />
      <ViewIssue issueId={id} />
    </ContentLayout>
  );
};
