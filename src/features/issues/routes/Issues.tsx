import { MainLayout } from '@/components/Layout/MainLayout'
import React from 'react'
import { IssuesList } from '../components/IssuesList'

export const Issues = () => {
    return (
        <MainLayout title="Issues">
            <IssuesList />
        </MainLayout>
    )
}
