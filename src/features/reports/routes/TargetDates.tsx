import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import TargetCalendar from '../components/TargetCalendar';
import { Container } from '@mui/material';

export default function TargetDates() {
  return (
    <ContentLayout title="Target Resolution Dates">
      <Container maxWidth="lg">
        <TargetCalendar />
      </Container>
    </ContentLayout>
  );
}
