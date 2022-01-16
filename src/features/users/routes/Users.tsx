import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';

import { UsersList } from '../components/UsersList';

export const Users = () => {
    return (
        <ContentLayout title="Users">
            <UsersList />
        </ContentLayout>
    )
}
