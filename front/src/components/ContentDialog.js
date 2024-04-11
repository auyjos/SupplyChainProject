
import * as React from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const ContentDialog = ({ open, title, closeCallback, buttonText, children, extraButton, extraButtonHandle, maxWidth, fullWidth }) => {

    const handleClose = () => {
        closeCallback();
      };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                     {buttonText || "Cerrar"}
                </Button>
                { extraButton &&
                    <Button onClick={extraButtonHandle}>
                    {extraButton}
               </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default ContentDialog;