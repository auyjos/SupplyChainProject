
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const SuccessCreatedDialog = ({ open, message, route, close }) => {

    const handleClose = () => {
        if(close !== undefined && close !== null){
            close()
        }else{
            window.location.replace(route)
        }
        
    };

    return(
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth   
            >
                <DialogTitle id="alert-dialog-title">
                    {message}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Presione "Aceptar" para regresar al listado.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

export default SuccessCreatedDialog;