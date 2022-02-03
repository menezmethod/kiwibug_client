import LoaderSuspense from '@/components/LoaderSuspense';
import {formatDateGrid} from '@/utils/format';
import {Container, Grid, styled} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import {Link} from 'react-router-dom';
import {useIssues} from '../api/getIssues';
import AddIssue from './AddIssue';
import {DeleteIssue} from './DeleteIssue';
import EditIssue from './EditIssue';

const Add = styled('div')(({theme}) => ({
    justifyContent: 'center',
    '@media(minWidth: 780px)': {
        alignItems: 'center',
    },
}));

export const IssuesList = () => {
    const issuesQuery = useIssues();

    if (!issuesQuery.data) return null;

    const issuesRows: any = issuesQuery?.data;

    if (issuesQuery.isLoading) {
        return <LoaderSuspense/>;
    }

    const issueColumns = [
        {
            name: 'issueSummary',
            label: 'SUMMARY',
            options: {
                // customBodyRender: (value: any) => <Link to={'issue/' + value.issuesId}>{value}</Link>,
                customBodyRender: (value: any, dataIndex: any) => (
                    <Link to={'/issue/' + dataIndex.rowData[11]}>{value}</Link>
                ),
            },
        },
        {
            name: 'identifiedDate',
            label: 'IDENTIFIED',
            options: {
                customBodyRender: (value: any) => formatDateGrid(value),
            },
        },
        {
            name: 'status',
            label: 'STATUS',
        },
        {
            name: 'priority',
            label: 'PRIORITY',
        },
        {
            name: 'targetResolutionDate',
            label: 'TARGET',
            options: {
                customBodyRender: (value: any) => formatDateGrid(value),
            },
        },
        {
            name: 'progress',
            label: 'PROGRESS',
        },
        {
            name: 'actualResolutionDate',
            label: 'ACTUAL',
            options: {
                customBodyRender: (value: any) => (value ? formatDateGrid(value) : ' '),
            },
        },
        {
            name: 'identifiedByEmployeeId',
            label: 'ID BY',
            options: {
                customBodyRender: (value: any) => value?.employeeName,
            },
        },
        {
            name: 'relatedProjectId',
            label: 'PROJECT',
            options: {
                customBodyRender: (value: any) => value?.projectName,
            },
        },
        {
            name: 'assignedToEmployeeId',
            label: 'ASSIGNED',
            options: {
                customBodyRender: (value: any) => value?.employeeName,
            },
        },
        {
            name: 'resolutionSummary',
            label: 'OUTCOME',
        },
        {
            name: 'issuesId',
            label: 'ACTIONS',
            options: {
                setCellHeaderProps: () => ({
                    style: {
                        justifyContent: 'flex-end',
                    },
                }),
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    return (
                        <Grid container spacing={0} justifyContent="center">
                            <Grid item>
                                <EditIssue issueId={value} show="icon"/>
                            </Grid>
                            <Grid item>
                                <DeleteIssue id={value} show="icon"/>
                            </Grid>
                        </Grid>
                    );
                },
            },
        },
    ];
    const options: any = {
        filterType: 'checkbox',
        selectableRows: 'none',
    };
    // @ts-ignore
    return (
        <Container maxWidth={false}>
            <Grid container justifyContent="flex-end">
                <Add>
                    <AddIssue/>
                </Add>
            </Grid>
            <br/>
            <MUIDataTable title="Issues" data={issuesRows} columns={issueColumns} options={options}/>
        </Container>
    );
};
