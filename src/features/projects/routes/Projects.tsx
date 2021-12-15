import { MainLayout } from '@/components/Layout/MainLayout'
import React from 'react'
import { ProjectsList } from '../components/ProjectsList'

export const Projects = () => {
    return (
        <MainLayout title="Projects">
            <ProjectsList />
        </MainLayout>
    )
}
