
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDialog = ({ open, nameToDelete, successCalback, cancelCallback, message }) => {

    const handleClose = () => {
       cancelCallback();
      };

      const handleDelete = () => {
        successCalback();
      }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { !(message !== null && message !== undefined) ?
                    <span>Esta seguro de querer anular la factura No. "{ nameToDelete }"?</span> :
                    message

                }
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Anular
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;