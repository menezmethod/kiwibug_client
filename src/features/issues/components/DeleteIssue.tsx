import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton, Link} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDeleteIssue} from '../api/deleteIssue';

type DeleteIssueProps = {
    id: string;
    show: string;
};

export const DeleteIssue = ({id, show}: DeleteIssueProps) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const deleteIssueMutation = useDeleteIssue();

    const handleOpen = () => {
        setOpen(true);
        console.log(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (deleteIssueMutation.isSuccess) {
            setOpen(false);
        }
        if (show === 'button' && deleteIssueMutation.isSuccess === true) {
            navigate('/'); // Use history when implemented
        }
    }, [deleteIssueMutation.isSuccess]);

    const onSubmit = async () => {
        await deleteIssueMutation.mutateAsync({issueId: id});
    };
    return (
        <>
            {show === 'icon' ? (
                <IconButton onClick={handleOpen} color="error" aria-label="edit project" component="span">
                    <DeleteIcon/>
                </IconButton>
            ) : (
                ''
            )}
            {show === 'button' ? (
                <Button onClick={handleOpen} variant="contained" color="error" startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            ) : (
                ''
            )}
            {show === 'text' ? (
                <Button onClick={handleOpen} color="error" startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            ) : (
                ''
            )}
            {show === 'link' ? (
                <Link onClick={handleOpen} style={{textDecoration: 'none'}}>
                    Edit
                </Link>
            ) : (
                ''
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure you want to delete this issue?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={onSubmit} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
