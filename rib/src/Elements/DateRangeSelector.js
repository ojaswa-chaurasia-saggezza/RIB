import React from "react";
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from "@material-ui/lab/DesktopDateRangePicker";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { TextField, Box } from "@material-ui/core";



export default function DateRangeSelector(props){

    const [value, setValue] = React.useState([null, null]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateRangePicker
                startText="Mobile start"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} variant="standard" />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} variant="standard" />
                    </React.Fragment>
                )}
            />
            <DesktopDateRangePicker
                startText="Desktop start"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} variant="standard" />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} variant="standard" />
                    </React.Fragment>
                )}
            />
        </LocalizationProvider>
    );
};