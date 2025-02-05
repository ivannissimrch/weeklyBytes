/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DeleteItemModal({ showDeleteItemModal, handleClosingDeleteItemDialog }) {
    const handleClose = (Agree) => {
        handleClosingDeleteItemDialog(Agree);
    };

    return (
        <>
            <Dialog
                sx={{ color: "white" }}
                open={showDeleteItemModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent sx={{ backgroundColor: "red" }}>
                    <DialogContentText id="alert-dialog-description" sx={{ color: "white" }}>
                        Are you sure you want to delete this allergen
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "red" }}>
                    <Button sx={{ color: "white" }} onClick={() => handleClose(false)}>
                        No
                    </Button>
                    <Button sx={{ color: "white" }} onClick={() => handleClose(true)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
