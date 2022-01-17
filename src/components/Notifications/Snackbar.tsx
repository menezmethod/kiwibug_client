import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSnackbar } from '@/redux/ducks/snackbar';
import { AppDispatch, RootState } from '@/redux/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const snackbarOpen = useSelector<RootState, boolean>((state) => state.snackbar.snackbarOpen);
  const snackbarType = useSelector<RootState, any>((state) => state.snackbar.snackbarType);
  const snackbarMessage = useSelector<RootState, any>((state) => state.snackbar.snackbarMessage);
  
  const handleClose = () => {
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={9000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
