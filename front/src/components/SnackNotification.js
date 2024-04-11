import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const SnackNotification = ({type, message, closeCallback, openFlag, setOpenFlag}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        if (closeCallback !== null && closeCallback !== undefined)
            closeCallback()
        setOpenFlag(false);
    };

    return (
        <Snackbar open={openFlag} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      );

}

export default SnackNotification;