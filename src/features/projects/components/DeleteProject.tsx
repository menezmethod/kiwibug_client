import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton, Link} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import {useDeleteProject} from '../api/deleteProject';

type DeleteProjectProps = {
    id: string;
    show: string;
};

export const DeleteProject = ({id, show}: DeleteProjectProps) => {
    const [open, setOpen] = React.useState(false);

    const deleteProjectMutation = useDeleteProject();

    const handleOpen = () => {
        setOpen(true);
        console.log(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async () => {
        await deleteProjectMutation.mutateAsync({projectId: id});
        setOpen(false);
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
            <div>
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Are you sure you want to delete this project?'}
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
                </div>
            </div>
        </>
    );
};
