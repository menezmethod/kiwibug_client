import {Paper,} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {useIssue} from '../api/getIssue';
import React from 'react';
import {formatDateGrid} from '@/utils/format';

type ViewIssueProps = {
    issueId: string;
    issuesId: string;
};

export default function ViewIssue({issueId}: ViewIssueProps) {
    const issueQuery = useIssue({issueId});

    const issueData = issueQuery?.data;

    function createData(name: string, values: any) {
        return {name, values};
    }

    const rows = [
        createData('Summary:', issueData?.issueSummary),
        createData('Description', issueData?.issueDescription),
        createData('Identified Date:', formatDateGrid(issueData?.identifiedDate)),
        createData('Status:', issueData?.status),
        createData('Priority', issueData?.priority),
        createData('Target Resolution Date', formatDateGrid(issueData?.targetResolutionDate)),
        createData('Progress', issueData?.progress),
        createData('Actual Resolution Date', formatDateGrid(issueData?.actualResolutionDate)),
        createData('Identified By:', issueData?.identifiedByEmployeeId?.employeeName),
        createData('Project Name:', issueData?.relatedProjectId?.projectName),
        createData('Assigned To:', issueData?.assignedToEmployeeId?.employeeName),
    ];
    return (
        <TableContainer component={Paper}>
            <Table aria-label="issues list">
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <strong>{row.name}</strong>
                            </TableCell>
                            <TableCell>{row.values}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
