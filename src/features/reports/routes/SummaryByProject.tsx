import {ContentLayout} from '@/components/Layout/ContentLayout';
import {Container} from '@mui/material';
import React from 'react';
import SummaryTable from '../components/SummaryTable';

export default function SummaryByProject() {
    return (
        <ContentLayout title="Issues Summary By Project">
            <Container maxWidth={false}>
                <SummaryTable/>
            </Container>
        </ContentLayout>
    );
}
