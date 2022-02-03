import LoaderSuspense from '@/components/LoaderSuspense';
import {useIssues} from '@/features/issues/api/getIssues';
import {useProjects} from '@/features/projects/api/getProjects';
import {formatDateReports} from '@/utils/format';
import {Divider, Typography} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SummaryTable() {
    const [projectName, setProjectName] = React.useState<string>('');
    const [totalIssues, setTotalIssues] = React.useState<number>(0);
    const [firstIdIssue, setFirstIdIssue] = React.useState<string>('');
    const [lastIdIssue, setLastIdIssue] = React.useState<string>('');
    const [openIssues, setOpenIssues] = React.useState<number>(0);
    const [closedIssues, setClosedIssues] = React.useState<number>(0);
    const [onHoldIssues, setOnHoldIssues] = React.useState<number>(0);
    const [noPriority, setNoPriority] = React.useState<number>(0);
    const [highPriority, setHighPriority] = React.useState<number>(0);
    const [mediumPriority, setMediumPriority] = React.useState<number>(0);
    const [lowPriority, setLowPriority] = React.useState<number>(0);
    const [assignedToRows, setAssignedTo] = React.useState<string[]>([]);

    const projectsQuery = useProjects();
    const issuesQuery = useIssues();

    if (issuesQuery.isLoading || projectsQuery.isLoading) {
        return <LoaderSuspense/>;
    }

    let projectsRows = projectsQuery?.data;
    let issuesData = issuesQuery?.data;

    const handleChange = (event: SelectChangeEvent) => {
        const allIssuesById = issuesData?.filter(function (a: any) {
            return a.relatedProjectId?.projectId === (event.target.value as string);
        });

        const statusOpenIssue = allIssuesById?.filter(function (a: any) {
            return a.status === 'Open';
        });
        const statusClosedIssue = allIssuesById?.filter(function (a: any) {
            return a.status === 'Closed';
        });
        const statusOnHoldIssues = allIssuesById?.filter(function (a: any) {
            return a.status === 'On-Hold';
        });

        const datesIssueId = allIssuesById.map((a: any) => {
            return a.createdOn;
        });
        const lastIssueClosed = statusClosedIssue.map((a: any) => {
            return a.actualResolutionDate;
        });

        const priorityNo = allIssuesById?.filter(function (a: any) {
            return a.priority === null;
        });
        const priorityHigh = allIssuesById?.filter(function (a: any) {
            return a.priority === 'High';
        });
        const priorityMedium = allIssuesById?.filter(function (a: any) {
            return a.priority === 'Medium';
        });
        const priorityLow = allIssuesById?.filter(function (a: any) {
            return a.priority === 'Low';
        });

        // Get counts for bottom table.
        function getOccurrenceClosed(array: any, value: any) {
            return statusClosedIssue.filter((v: any) => v.assignedToEmployeeId?.employeeName === value)
                .length;
        }

        function getOccurrenceOnHold(array: any, value: any) {
            return statusOnHoldIssues.filter((v: any) => v.assignedToEmployeeId?.employeeName === value)
                .length;
        }

        function getOccurrenceOpen(array: any, value: any) {
            return statusOpenIssue.filter((v: any) => v.assignedToEmployeeId?.employeeName === value)
                .length;
        }

        // Create a temporary array for bottom table. Load it with data
        const assignedToArr: any[] = [];

        statusOpenIssue.map((a: any) => {
            if (
                getOccurrenceOpen(statusOpenIssue, a.assignedToEmployeeId?.employeeName) &&
                a.assignedToEmployeeId?.employeeName !== undefined
            ) {
                let openLoad = {
                    name: a.assignedToEmployeeId?.employeeName,
                    issues: getOccurrenceOpen(assignedToArr, a.assignedToEmployeeId?.employeeName),
                    status: a.status,
                };
                assignedToArr.push(openLoad);
            }
            return assignedToArr;
        });

        statusOnHoldIssues.map((a: any) => {
            if (getOccurrenceOnHold(statusOnHoldIssues, a.assignedToEmployeeId?.employeeName)) {
                let onHoldLoad = {
                    name: a.assignedToEmployeeId?.employeeName,
                    issues: getOccurrenceOnHold(assignedToArr, a.assignedToEmployeeId?.employeeName),
                    status: a.status,
                };
                assignedToArr.push(onHoldLoad);
            }
            return assignedToArr;
        });
        statusClosedIssue.map((a: any) => {
            if (getOccurrenceClosed(statusClosedIssue, a.assignedToEmployeeId?.employeeName)) {
                let closedLoad = {
                    name: a.assignedToEmployeeId?.employeeName,
                    issues: getOccurrenceClosed(assignedToArr, a.assignedToEmployeeId?.employeeName),
                    status: a.status,
                };
                assignedToArr.push(closedLoad);
            }
            return assignedToArr;
        });

        // Remove duplicates before displaying
        const assignedToRows = assignedToArr.reduce((unique, o) => {
            if (
                !unique.some(
                    (obj: { name: any; status: any; issues: any }) =>
                        obj.name === o.name && obj.status === o.status && obj.issues === o.issues
                )
            ) {
                unique.push(o);
            }
            return unique;
        }, []);

        // Sort dates
        let sortedIssuesCreatedOn = datesIssueId.sort();
        let sortedLastIssueClosed = lastIssueClosed
            .sort()
            .reverse()
            .filter((x: null) => x !== null);

        // Set values
        if (allIssuesById) {
            setTotalIssues(allIssuesById.length);
        } else {
            setTotalIssues(0);
        }

        if (sortedIssuesCreatedOn.length !== 0) {
            setFirstIdIssue(formatDateReports(sortedIssuesCreatedOn[0]));
        } else {
            setFirstIdIssue('No Issues Identified');
        }

        if (sortedLastIssueClosed.length !== 0 && sortedLastIssueClosed !== null) {
            setLastIdIssue(formatDateReports(sortedLastIssueClosed[0]));
        } else if (sortedLastIssueClosed.includes(null)) {
            setLastIdIssue('No Issues Closed');
        } else {
            setLastIdIssue('No Issues Closed');
        }

        setProjectName(event.target.value as string);
        setOpenIssues(statusOpenIssue.length);
        setClosedIssues(statusClosedIssue.length);
        setOnHoldIssues(statusOnHoldIssues.length);
        setNoPriority(priorityNo.length);
        setHighPriority(priorityHigh.length);
        setMediumPriority(priorityMedium.length);
        setLowPriority(priorityLow.length);
        setAssignedTo(assignedToRows);

        // console.log(assignedToArr);
    };

    function createData(name: string, values: any) {
        return {name, values};
    }

    const rows = [
        createData('First Issue Identified:', firstIdIssue),
        createData('Last Issue Closed:', lastIdIssue),
        createData('Total Issues:', totalIssues),
        createData('Open Issues:', openIssues),
        createData('On-Hold Issues:', onHoldIssues),
        createData('Closed Issues:', closedIssues),
        createData('Open Issues with No Priority:', noPriority),
        createData('Open Issues of High Priority:', highPriority),
        createData('Open Issues of Medium Priority:', mediumPriority),
        createData('Open Issues of Low Priority:', lowPriority),
    ];
    return (
        <TableContainer component={Paper}>
            <FormControl fullWidth>
                <InputLabel id="select_project">Select Project</InputLabel>
                <Select
                    labelId="select_project"
                    id="selectproject"
                    value={projectName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Project Name"/>}
                    MenuProps={MenuProps}
                >
                    {projectsRows?.map((projectsRows: any) => (
                        <MenuItem key={projectsRows.projectId} value={projectsRows.projectId}>
                            {projectsRows.projectName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Table aria-label="summary">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Summary</Typography>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <strong>{row.values}</strong>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider/>
            <Table aria-label="summary">
                <TableHead>
                    <TableRow>
                        <TableCell>Assigned To </TableCell>
                        <TableCell>Number of Issues</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignedToRows?.map((row: any) => (
                        <TableRow
                            key={row?.name + Math.floor(Math.random() * 100)}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row?.name}
                            </TableCell>
                            <TableCell>{row?.issues}</TableCell>
                            <TableCell>{row?.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
