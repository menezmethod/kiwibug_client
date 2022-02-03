import LoaderSuspense from '@/components/LoaderSuspense';
import {formatRole} from '@/utils/format';
import {Container, Grid, styled} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import {useUsers} from '../api/getUsers';
import AddUser from './AddUser';
import {DeleteUser} from './DeleteUser';
import EditUser from './EditUser';

const Add = styled('div')(({theme}) => ({
    justifyContent: 'center',
    '@media(minWidth: 780px)': {
        alignItems: 'center',
    },
}));

export const UsersList = () => {
    const usersQuery = useUsers();

    if (usersQuery.isLoading) {
        return <LoaderSuspense/>;
    }

    const userColumns = [
        {
            name: 'employeeName',
            label: 'NAME',
        },
        {
            name: 'email',
            label: 'EMAIL',
        },
        {
            name: 'roles',
            label: 'ROLE',
            options: {
                customBodyRender: (value: any) => formatRole(value),
            },
        },
        {
            name: 'username',
            label: 'USERNAME',
        },
        {
            name: 'assignedProjects',
            label: 'ASSIGNED PROJECT',
            options: {
                customBodyRender: (value: any) => value?.projectName,
            },
        },
        {
            name: 'employeeId',
            label: 'ACTIONS',
            options: {
                setCellHeaderProps: () => ({
                    style: {
                        display: 'flex',
                        justifyContent: 'right',
                    },
                }),
                customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                    return (
                        <Grid container spacing={0} justifyContent="flex-end">
                            <Grid item>
                                <EditUser employeeId={value} show="icon"/>
                            </Grid>
                            <Grid item>
                                <DeleteUser id={value} show="icon"/>
                            </Grid>
                        </Grid>
                    );
                },
            },
        },
    ];

    const options = {
        filterType: 'dropdown',
        selectableRows: 'none',
        fixedHeader: true,
    };

    if (!usersQuery.data) return null;

    let usersRows = usersQuery?.data;

    return (
        <Container maxWidth={false}>
            <Grid container justifyContent="flex-end">
                <Add>
                    <AddUser/>
                </Add>
            </Grid>
            <br/>
            <MUIDataTable title="Users" data={usersRows} columns={userColumns} options={options}/>
        </Container>
    );
};
