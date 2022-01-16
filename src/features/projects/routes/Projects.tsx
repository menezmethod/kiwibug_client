import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';

import { ProjectsList } from '../components/ProjectsList';

export const Projects = () => {
    return (
        <ContentLayout title="Projects">
            <ProjectsList />
        </ContentLayout>
    )
}
