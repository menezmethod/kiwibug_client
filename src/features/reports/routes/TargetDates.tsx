import {ContentLayout} from '@/components/Layout/ContentLayout';
import {Container} from '@mui/material';
import React from 'react';
import TargetCalendar from '../components/TargetCalendar';

export default function TargetDates() {
    return (
        <ContentLayout title="Target Resolution Dates">
            <Container maxWidth={false}>
                <TargetCalendar/>
            </Container>
        </ContentLayout>
    );
}
