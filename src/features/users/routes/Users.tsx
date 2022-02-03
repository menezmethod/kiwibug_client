import {ContentLayout} from '@/components/Layout/ContentLayout';
import React from 'react';
import {UsersList} from '../components/UsersList';

export const Users = () => {
    return (
        <ContentLayout title="Users">
            <UsersList/>
        </ContentLayout>
    );
};
