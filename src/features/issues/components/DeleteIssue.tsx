import * as React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteIssue } from '../api/deleteIssue';

type DeleteIssueProps = {
  id: string;
};

export const DeleteIssue = ({ id }: DeleteIssueProps) => {
  const [open, setOpen] = React.useState(false);

  const deleteIssueMutation = useDeleteIssue();

  const handleOpen = () => {
    setOpen(true);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    await deleteIssueMutation.mutateAsync({ issueId: id });
  };

  return (
    <div>
      <Button onClick={handleOpen} color="error" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <div>
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
      </div>
    </div>
  );
};
