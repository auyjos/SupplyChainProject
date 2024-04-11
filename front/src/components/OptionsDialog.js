
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const OptionsDialog = ({ open, title, successCalback, cancelCallback, options }) => {
    
    const [value, setValue] = React.useState(1);

    const handleClose = () => {
       cancelCallback();
      };

      const handleAccept = () => {
        successCalback(value);
      }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={handleChange}
                >
                {options.map((option) => (
                    <FormControlLabel
                    value={option.id}
                    key={option.id}
                    control={<Radio />}
                    label={option.title}
                    />
                ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                <Button onClick={handleAccept}>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OptionsDialog;