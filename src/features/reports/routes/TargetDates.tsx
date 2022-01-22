import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { Paper } from '@mui/material';
import TargetCalendar from '../components/TargetCalendar';

export default function TargetDates() {
  return (
    <ContentLayout title="Target Resolution Dates">
      <Paper>
        <TargetCalendar />
      </Paper>
    </ContentLayout>
  );
}
