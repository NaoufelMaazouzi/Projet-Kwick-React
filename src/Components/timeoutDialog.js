import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";


function TimeoutDialog(props) {
    const { open, setOpen } = props;
    let history = useHistory();

    const handleClose = () => {
        setOpen(false);
        localStorage.clear();
        history.go(0)
        history.push("/login");
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Vous êtes déconnécté"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Vous avez été déconnecté dû à votre innactivité de plus de 20 minutes
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Se reconnecter
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TimeoutDialog;





