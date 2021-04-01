import React from "react";


import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";


export default function PlainDialog(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
            <DialogContent >
                <DialogContentText
                    component={'pre'}
                    style={{ whiteSpace: 'break-space' }}

                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    {props.data}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Close
          </Button>

            </DialogActions>
        </Dialog>
    );
}