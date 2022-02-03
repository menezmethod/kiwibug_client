import React from 'react';

import {ContentLayout} from '@/components/Layout/ContentLayout';
import ViewIssue from '../components/ViewIssue';
import {useParams} from 'react-router-dom';
import {Grid} from '@mui/material';
import EditIssue from '../components/EditIssue';
import {DeleteIssue} from '../components/DeleteIssue';

export const Issue = () => {
    const {id} = useParams();

    return (
        <ContentLayout title="Edit Issue">
            <Grid container spacing={1} justifyContent="flex-end">
                <Grid item>
                    <EditIssue issueId={id || '1'} show="button"/>
                </Grid>
                <Grid item>
                    <DeleteIssue id={id || '1'} show="button"/>
                </Grid>
            </Grid>
            <br/>
            <ViewIssue issueId={id || '1'}/>
        </ContentLayout>
    );
};
