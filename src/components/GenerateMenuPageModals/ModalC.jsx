/* eslint-disable react/prop-types */

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function ModalC({ onAgree, onDisagree }) {
    return (
        <>
            <Dialog
                sx={{ color: "white" }}
                open
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent sx={{ backgroundColor: "white"}}>
                    <DialogContentText id="alert-dialog-description" sx={{ color: "black"}}>
                        Regenerate menu for selected week?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "white"}}>
                    <Button sx={{ color: "red"}} onClick={onDisagree}>
                        No
                    </Button>
                    <Button sx={{color: "black"}} onClick={onAgree} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
