import { ContentLayout } from '@/components/Layout/ContentLayout';
import React from 'react';

import { IssuesList } from '../components/IssuesList';

export const Issues = () => {
    return (
        <ContentLayout title="Issues">
            <IssuesList />
        </ContentLayout>
    )
}
