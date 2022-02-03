import {ContentLayout} from '@/components/Layout/ContentLayout';
import React from 'react';
import {ProjectsList} from '../components/ProjectsList';

export const Projects = () => {
    return (
        <ContentLayout title="Projects">
            <ProjectsList/>
        </ContentLayout>
    )
}
