import { MainLayout } from '@/components/Layout/MainLayout'
import React from 'react'
import { UsersList } from '../components/UsersList'

export const Users = () => {
    return (
        <MainLayout title="Users">
            <UsersList />
        </MainLayout>
    )
}
